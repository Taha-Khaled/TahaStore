import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s ease;
  ${mobile({ height: "30vh" })}
`;
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  &:hover ${Image} {
    transform: scale(1.1);
  }
  overflow: hidden;
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: white;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: white;
  color: gray;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
