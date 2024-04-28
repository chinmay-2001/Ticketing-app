import {
  Publisher,
  OrderCreatedEvent,
  Subject,
} from "@chinmayticketsinno/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subject.OrderCreated = Subject.OrderCreated;
}
