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
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      <div className="featured_products_list align_center">
        {error && <em className="form_error">{error}</em>}
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
