import buildClient from "../../api/build-client";
const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders?.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const {
    data: { currentUser },
  } = await client.get("/api/users/currentuser");
  const { data } = await client.get("/api/orders");

  return { props: { orders: data || [], currentUser: currentUser } };
}
export default OrderIndex;
