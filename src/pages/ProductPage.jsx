import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { publicRequest} from "../requestMethods";
import { addProduct } from "../redux/cartSlice";
import { useDispatch} from "react-redux";

const Wrapper = styled.div`
  position: relative;
  top: 90px;
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: teal;
  }
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line
  const [color, setColor] = useState("");
  // eslint-disable-next-line
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handelQuantity = (operator) => {
    if (operator === "dec" && quantity !== 1) {
      setQuantity(quantity - 1);
    } else if (operator === "inc") setQuantity(quantity + 1);
  };

  const dispatch = useDispatch();
  const handelClick = () => {
    /*color && size
      ? dispatch(addProduct({ ...product, quantity, color, size }))
      : alert("Choose Color an Size");*/
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={product.img} />
      </ImageContainer>
      <InfoContainer>
        <Title>{product.title}</Title>
        <Description>{product.desc}</Description>
        <Price>$ {product.price}</Price>
        <FilterContainer>
          <Filter>
            <FilterTitle>Color</FilterTitle>
            {product.color?.map((color) => (
              <FilterColor
                color={color}
                key={color}
                onClick={() => {
                  setColor(color);
                }}
              />
            ))}
          </Filter>
          <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize onChange={(e) => setSize(e.target.value)}>
              {product.size?.map((size) => (
                <FilterSizeOption key={size}>{size}</FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <Remove
              style={{ cursor: "pointer" }}
              onClick={() => handelQuantity("dec")}
            />
            <Amount>{quantity}</Amount>
            <Add
              style={{ cursor: "pointer" }}
              onClick={() => handelQuantity("inc")}
            />
          </AmountContainer>
          <Button onClick={handelClick}>ADD TO CART</Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default Product;
