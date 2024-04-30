import experss, { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { Ticket } from "../models/tickets";
import { BadRequestError } from "@chinmayticketsinno/common";
const router = experss.Router();
import {
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@chinmayticketsinno/common";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedPublisher } from "../../events/publishers/order-created-publisher";

const EXPIRATION_WINDOW_SECOND = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .isEmpty()
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Make sure that this ticket is not already reserved

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);

    // Build the order and save it to the database

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
