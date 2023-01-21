import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const KEY = process.env.REACT_APP_STRIPE;
const Container = styled.div``;
const Wrapper = styled.div`
  position: relative;
  top: 90px;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  //border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 25px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  height: 1px;
  border: none;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  let amount = 0;
  const history = useHistory();
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (error) {
        console.log(error);
        console.log("done");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, history]);

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(
          `orders/getorders/${currentUser._id}`
        );
        setOrders(res.data);
      } catch (e) {}
    };
    getOrders();
  }, [currentUser]);

  amount = orders.map((order) => (amount += order.amount));
  const totalSpent = amount.reduce((a, b) => a + b, 0);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({`${cart.products.length}`})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {currentUser ? (
            cart.totalPrice > 0 && (
              <StripeCheckout
                name="Taha Store"
                image="https://i.ibb.co/xXmRygz/mylogo-white.png"
                description={`Your total is $${cart.totalPrice}`}
                shippingAddress
                amount={cart.totalPrice * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <TopButton type="filled">CHECK OUT NOW!</TopButton>
              </StripeCheckout>
            )
          ) : (
            <Link to="/login">
              <TopButton type="filled">CHECK OUT NOW!</TopButton>
            </Link>
          )}
        </Top>
        <Bottom>
          <Info>
            {orders.length > 0 && (
              <Title>
                ({orders.length}) orders are pending, total spent $
                {` ${totalSpent}`}
              </Title>
            )}

            {cart.products.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product :</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID :</b>
                      {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>SIZE :</b>
                      {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            {currentUser ? (
              cart.totalPrice > 0 && (
                <StripeCheckout
                  name="Taha Store"
                  image="https://i.ibb.co/xXmRygz/mylogo-white.png"
                  description={`Your total is $${cart.totalPrice}`}
                  shippingAddress
                  amount={cart.totalPrice * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
              )
            ) : (
              <Link to="/login">
                <Button>CHECKOUT NOW</Button>
              </Link>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default CartPage;
