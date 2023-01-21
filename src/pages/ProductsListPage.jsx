import { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Products from "../components/Products/Products";
import { mobile } from "../responsive";

const Container = styled.div`
  position: relative;
  top: 100px;
`;
const Title = styled.h1`
  margin: 0 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductsListPage = () => {
  const location = useLocation();
  const Category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("newest");
  const handelFilters = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  return (
    <Container>
      <Title>{Category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handelFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handelFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Low Price</Option>
            <Option value="desc">High Price</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products sort={sort} cat={Category} filters={filters} />
    </Container>
  );
};

export default ProductsListPage;
