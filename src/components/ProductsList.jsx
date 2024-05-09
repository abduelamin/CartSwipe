import React, { useEffect, useState } from "react";
import "../styles/ProductsList.css";
import ProductCard from "./ProductCard";
import api from "../utils/api-client";

const ProductsList = () => {
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
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="name" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price: High to Low</option>
          <option value="price asc">Price: Low to High</option>
          <option value="rate desc">Rate: High to Low</option>
          <option value="rate asc">Rate: Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </section>
  );
};

export default ProductsList;
