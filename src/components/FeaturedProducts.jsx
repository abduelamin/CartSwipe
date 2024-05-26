import React, { useEffect, useState } from "react";
import "../styles/FeaturedProducts.css";
import ProductCard from "./ProductCard";
import api from "../utils/api-client";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/featured");

        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const featuredArray = [...products].splice(0, 3);
  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      <div className="featured_products_list align_center">
        {error && <em className="form_error">{error}</em>}
        {featuredArray.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
