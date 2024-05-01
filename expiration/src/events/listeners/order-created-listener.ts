import {
	listener,
	OrderCreatedEvent,
	OrderStatus,
	Subject,
} from "@chinmayticketsinno/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
export class OrderCreatedListner extends listener<OrderCreatedEvent> {
	subject: Subject.OrderCreated = Subject.OrderCreated;
	queueGroupName: string = queueGroupName;
	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
		const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
		console.log("Waiting this manyu millisecond ot proces the job");
		await expirationQueue.add(
			{
				orderId: data.id,
			},
			{
				delay,
			}
		);
		msg.ack();
	}
}
