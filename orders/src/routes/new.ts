import experss, { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/order";
import { Ticket } from "../models/tickets";
const router = experss.Router();
import { requireAuth, validateRequest } from "@chinmayticketsinno/common";
import { body } from "express-validator";

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

    // Calculate an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that an order was created

    res.send({});
  }
);

export { router as newOrderRouter };
