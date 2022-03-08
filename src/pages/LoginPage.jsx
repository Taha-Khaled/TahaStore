import { mobile } from "../responsive";
import styled from "styled-components";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  position: relative;
  top: 90px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 10px 0;
  border: 1px solid lightgray;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  margin: 10px 0;
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
  ${mobile({ width: "100%" })}
`;
const Link = styled.a`
  margin: 10px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handelLogin = (event) => {
    event.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handelLogin} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>WRONG USERNAME OR PASSWORD</Error>}
          <Link>Don't Remember Your Password? </Link>
          <Link>Create New Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
