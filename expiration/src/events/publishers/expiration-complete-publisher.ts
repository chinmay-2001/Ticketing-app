import {
	Subject,
	Publisher,
	ExpirationCompleteEvent,
} from "@chinmayticketsinno/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
}
