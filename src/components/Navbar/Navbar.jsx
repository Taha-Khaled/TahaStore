import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _IMG from "../../assits/logo.png";
import { userLogout } from "../../redux/userSlice";
import { emptyCart } from "../../redux/cartSlice";
import Announcement from "./Announcement";

const Container = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 70px;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  //center horizontally
  justify-content: space-between;
  //center vertically
  align-items: center;
  background-color: white;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: "20px", fontWeight: 400 })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: ${(props) => (props.user ? "20px" : "14px")};
  cursor: pointer;
  margin-left: 25px;
  transition: all 0.5s ease;
  ${mobile({ fontSize: "14px", marginLeft: "10px" })}
  &:hover {
    transform: scale(1.1);
    font-weight: 500;
  }
`;
const Image = styled.img`
  width: 40px;
  ${mobile({ width: "35px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(emptyCart());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none", color: "black" }} to="/home">
            <Logo>
              Taha
              <Image src={_IMG} /> Store
            </Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/cart"
              >
                <MenuItem
                  user={true}
                >{`${user.firstName} ${user.lastName}`}</MenuItem>
              </Link>
              <MenuItem onClick={logoutHandler}>logout</MenuItem>
            </>
          ) : (
            <>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Login</MenuItem>
              </Link>
            </>
          )}

          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>
              <Badge color="primary" badgeContent={quantity}>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      <Announcement />
    </Container>
  );
};

export default Navbar;
