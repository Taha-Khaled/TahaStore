import { mobile } from "../responsive";
import styled from "styled-components";
import _BACKGROUND from "../assits/register1.jpg";

import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  top: 90px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 168, 168, 0.5)
    ),
    url(${_BACKGROUND}) center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 20px 10px 0 0;
  border: 1px solid lightgray;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  width: 40%;
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

const RegisterPage = () => {
  const [user, setUser] = useState({});
  //const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const registerHandler = (e) => {
    e.preventDefault();
    console.log(user);
    register(dispatch, user);
  };
  return (
    <Container>
      <Wrapper>
        <Title>Create New Account</Title>
        <Form onSubmit={registerHandler}>
          <Input
            placeholder="First Name"
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                firstName: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Last Name"
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                lastName: e.target.value,
              }))
            }
          />
          <Input
            placeholder="E-Mail"
            type="email"
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                email: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Username"
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                username: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setUser((user) => ({
                ...user,
                password: e.target.value,
              }))
            }
          />
          <Agreement>
            I agree that My information is used to allow me to sign in securely
            and access my data. <br />
            We records certain usage data for security, support, and reporting,
            <b>privacy policy</b>
          </Agreement>
          <Button disabled={isFetching}>Create an account</Button>
        </Form>
        {error && <p>Choose another username or Email</p>}
      </Wrapper>
    </Container>
  );
};

export default RegisterPage;
