import React from "react";
import "../styles/ProductsPage.css";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  return (
    <section className="products_page">
      <Sidebar />
      <ProductsList />
    </section>
  );
};

export default ProductsPage;
