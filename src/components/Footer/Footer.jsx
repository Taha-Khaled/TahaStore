import {
  Facebook,
  GitHub,
  LibraryBooks,
  LinkedIn,
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  position: relative;
  top: 90px;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.Color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f9fff8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Taha Store</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sint
          iste in expedita sit commodi veritatis earum facere vel molestiae
          accusamus numquam ducimus repudiandae, illo, ea quas harum,
          repellendus odio.
        </Description>
        <SocialContainer>
          <a
            href="https://www.facebook.com/Taha.Khalled/"
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon Color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a
            href="https://drive.google.com/file/d/1MYJjg_PBRQtayK3O5QSwnV5_ggMn7_t1/view?usp=sharing
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon Color="9830bf">
              <LibraryBooks />
            </SocialIcon>
          </a>
          <a
            href="https://github.com/Taha-Khaled/"
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon Color="000000">
              <GitHub />
            </SocialIcon>
          </a>
          <a
            href="https://www.linkedin.com/in/taha-khalled/"
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon Color="0076b3">
              <LinkedIn />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +2011 2084 4738
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          tahauideveloper@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
