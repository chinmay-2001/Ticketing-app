import {
  Publisher,
  orderCancelledEvent,
  Subject,
} from "@chinmayticketsinno/common";

export class OrderCancelledPublisher extends Publisher<orderCancelledEvent> {
  subject: Subject.orderCancelled = Subject.orderCancelled;
}
