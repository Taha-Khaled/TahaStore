import React from "react";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
    </div>
  );
};

export default HomePage;
