import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProductsPage from "./components/ProductsPage";
import SingleProduct from "./components/SingleProduct";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <Homepage /> */}
        {/* <ProductsPage /> */}
        <SingleProduct />
      </main>
    </div>
  );
};

export default App;
