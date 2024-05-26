import React, { useContext, useEffect, useState } from "react";
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
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/CartServices";
import userContext from "./Contexts/userContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartContext from "./Contexts/cartContext";
import ProtectedPages from "./components/ProtectedPages";

setAuthToken(localStorage.getItem("token"));

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

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

  const addToCart = async (product, itemCount) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    ); // The way we are comparing with 'product.id' is because we're passing this function down to each product card. So the product.id will be known automatically. This variable is just checking if this product already exists in our cart or not

    // CODE BELOW: findIndex method looks for the index number of the item, if cannot find the item we're looking for it returns -1, so we're checking if this product is not in our cart then add that product object and its quanity to the cart. If the item index is found we then select that item quanity property and increase its quantity based on what the user selected
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: itemCount });
    } else {
      updatedCart[productIndex].quantity += itemCount;
    }

    setCart(updatedCart);

    // The reason we do the above code ^^ is because if we just do setCart(...cart, {product: prod, quantity: itemcount  }) is that when the user adds for example an iphone to cart and then looks to add an extra i phone, this above code will treat it as a compleltey different item rather than increase the quantity of it (if you look at react coponents on your console you'll gain more clarity)

    /* 
    - The code below calls the cartAPI to send the product ID and its quantity to the cart API BE.
    - If successful we get a success message which can display using toast notfication
    - The error and success messages are created from the backend. 
    So in short all we're doing is sending the users input to the backend via a post request and wrapping it in try and catch block just like any async code
    */
    try {
      const response = await addToCartAPI(product._id, itemCount);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response);
      toast.error(
        "Something went wrong. You must be logged in to add this item to your cart"
      );
      setCart(cart); // This is added in the catch block so that if an error occurs when adding an item to the cart we restore our previous cart.
    }
  };

  const getCart = async () => {
    try {
      const res = await getCartAPI();
      setCart(res.data);
      // console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Must add this user Conditon, otherwise we will get the error message because we can't access getCartAPI without JWT

    // I've tested different things out and this is the only one that makes the app wrok as inteded. but why? Even though USer is an object its working jsut fine as a dependecy
    user ? getCart() : null;
  }, [user]);

  // For removal of item from the cartback and backend when user deletes the item
  const removeFromCart = async (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    try {
      const res3 = await removeFromCartAPI(id);
      toast.info(res3.data.message);
    } catch (error) {
      toast.error("Something went wrong");
      setCart(oldCart);
    }
  };

  // Increasing and decreasing quantity within the cartPage

  const updateCart = async (type, id) => {
    const oldCart = [...cart];
    const latestCart = [...cart];
    const productIndex = latestCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      latestCart[productIndex].quantity += 1;
      setCart(latestCart);
      try {
        await increaseProductAPI(id);
      } catch (error) {
        toast.error("Something went wrong");
        setCart(oldCart);
      }
    }

    if (type === "decrease") {
      latestCart[productIndex].quantity -= 1;
      setCart(latestCart);

      try {
        await decreaseProductAPI(id);
      } catch (error) {
        toast.error("Something went wrong");
        setCart(oldCart);
      }
    }
  };

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, removeFromCart, updateCart, addToCart, setCart }}
      >
        <div className="app">
          <ToastContainer position="bottom-center" />

          <Navbar user={user} cartLength={cart.length} />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/product/:id"
                element={
                  <SingleProduct
                    addToCart={addToCart}
                    count={count}
                    setCount={setCount}
                  />
                }
              />
              <Route path="/myOrders" element={<MyOrder />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedPages user={user} />}>
                <Route path="/signUp" element={<SignupPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/cart"
                  element={
                    <CartPage
                      cart={cart}
                      addToCart={addToCart}
                      count={count}
                      setCount={setCount}
                    />
                  }
                />
              </Route>
            </Routes>
          </main>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
};

export default App;
