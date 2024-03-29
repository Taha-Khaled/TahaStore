import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Newsletter from "./components/Newsletter/Newsletter";
import Product from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsListPage from "./pages/ProductsListPage";
import CartPage from "./pages/CartPage";
import { Switch, Route, Redirect } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import AllProducts from "./pages/AllProducts";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route path="/TahaStore" exact>
            <HomePage />
            {window.scrollTo(0, 0)}
          </Route>
          <Route path="/products/:category">
            <ProductsListPage />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/TahaStore" /> : <LoginPage />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/TahaStore" /> : <RegisterPage />}
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </ScrollToTop>
      <Newsletter />
      <Footer />
    </>
  );
};

export default App;
