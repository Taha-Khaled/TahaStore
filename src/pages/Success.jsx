import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { emptyCart } from "../redux/cartSlice";
import styled from "styled-components";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  let added = useRef();
  added.current = false;
  const dispatch = useDispatch();
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders/neworder", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.totalPrice,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };

    data && currentUser && createOrder();
  }, [cart, data, currentUser]);

  const Button = styled.button`
    margin: 10px 0;
    font-size: 20px;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    border: 2px solid teal;
    color: white;
    cursor: pointer;
    &:disabled {
      background-color: white;
      color: teal;
      cursor: not-allowed;
    }
    &:hover {
      background-color: white;
      color: teal;
    }
  `;
  const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
  `;
  return (
    <Container>
      <Title>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
      </Title>
      <Link to="/TahaStore">
        <Button
          style={{ padding: 10, marginTop: 20 }}
          onClick={() => dispatch(emptyCart())}
        >
          Clear My Cart and Go to Homepage
        </Button>
      </Link>
    </Container>
  );
};

export default Success;
