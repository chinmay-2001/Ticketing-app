import {
	Subject,
	Publisher,
	PaymentCreatedEvent,
} from "@chinmayticketsinno/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subject.PaymentCreated = Subject.PaymentCreated;
}
