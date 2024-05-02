import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProductsPage from "./components/ProductsPage";
import SingleProduct from "./components/SingleProduct";
import CartPage from "./components/CartPage";
import MyOrder from "./components/MyOrder";
import LoginPage from "./components/authentication/LoginPage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <Homepage /> */}
        {/* <ProductsPage /> */}
        {/* <SingleProduct /> */}
        {/* <CartPage /> */}
        {/* <MyOrder /> */}
        <LoginPage />
      </main>
    </div>
  );
};

export default App;
