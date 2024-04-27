import {Publisher , Subject , TicketUpdatedEvent} from '@chinmayticketsinno/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subject.TicketUpdate = Subject.TicketUpdate;
}