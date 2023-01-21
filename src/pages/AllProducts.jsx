import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "../components/Products/Product";
import axios from "axios";

const Wrapper = styled.div`
  position: relative;
  top: 90px;
  padding: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h1`
  margin: 20px;
  font-size: 40px;
`;

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://api-shop-api.herokuapp.com/api/products"
        );
        setProducts(
          res.data.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
          )
        );
      } catch (error) {}
    };
    getProducts();
  }, []);

  return (
    <Wrapper>
      <Title>Products</Title>
      <Container>
        {products.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default AllProducts;
