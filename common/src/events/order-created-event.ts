import { Subject } from "./subjects";
import { OrderStatus } from "./types/order-status";
export interface OrderCreatedEvent {
  subject: Subject.OrderCreated;
  data: {
    id: string;
    userId: string;
    status: OrderStatus;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
