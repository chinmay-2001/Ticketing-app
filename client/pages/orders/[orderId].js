import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timeLeft);
    };
  }, []);
  if (timeLeft < 0) {
    return <div> Order Expires</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} second
      <StripeCheckout
        token={(token) => console.log(token)}
        stripeKey="pk_test_51PDCaTSDRVgmzBeNcizNHyCrzDkDhkeY22qytFMci1l5CK4f9TeBymNGLm7dZdoGdNHG4TrttKtISm2CVaRgdKfP00yB0ulb8P"
        amount={order?.ticket?.price * 100}
        email={currentUser?.email ? currentUser.email : null}
      ></StripeCheckout>
    </div>
  );
};

OrderShow.getInitialProps = async (useContext, client) => {
  const { orderId } = useContext.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  console.log(data);
  return { order: data };
};

export default OrderShow;
