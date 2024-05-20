import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProductsPage from "./components/ProductsPage";
import SingleProduct from "./components/SingleProduct";
import CartPage from "./components/CartPage";
import MyOrder from "./components/MyOrder";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import { Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Logout from "./components/authentication/Logout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtPayload = jwtDecode(jwt);

      if (Date.now() >= jwtPayload.exp * 1000) {
        localStorage.removeItem("token");
        location.reload(); // This code will reload the page after removing the token. Its good practice to have this because no use in having the page remain the same if the user token is unavailable
      } else {
        setUser(jwtPayload);
      }
    } catch (error) {}
  }, []);

  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/myOrders" element={<MyOrder />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
