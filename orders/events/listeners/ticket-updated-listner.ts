import { Message } from "node-nats-streaming";
import {
  Subject,
  listener,
  TicketUpdatedEvent,
} from "@chinmayticketsinno/common";
import { Ticket } from "../../src/models/tickets";

import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListner extends listener<TicketUpdatedEvent> {
  subject: Subject.TicketUpdate = Subject.TicketUpdate;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    msg: Message
  ) {
    const ticket = await Ticket.findById(data.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
