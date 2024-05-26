import React, { useEffect, useState } from "react";
import "../styles/FeaturedProducts.css";
import ProductCard from "./ProductCard";
import api from "../utils/api-client";
import LoadingSpinner from "./Loading";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/featured");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredArray = [...products].splice(0, 3);

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      {error && <em className="form_error">{error}</em>}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="featured_products_list align_center">
          {featuredArray.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
