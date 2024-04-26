import React from "react";
import "../styles/FeaturedProducts.css";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      <div className="featured_products_list align_center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default FeaturedProducts;
