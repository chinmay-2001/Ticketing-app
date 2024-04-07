import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to nats");
  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });
});
