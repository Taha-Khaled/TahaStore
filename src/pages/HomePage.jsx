import React from "react";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products"; /*
import Announcement from "../components/Navbar/Announcement";
import Navbar from "../components/Navbar/Navbar";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";*/

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
