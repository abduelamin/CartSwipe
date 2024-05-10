import React, { useEffect, useState } from "react";
import "../styles/ProductsList.css";
import ProductCard from "./ProductCard";
import api from "../utils/api-client";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [mainDataObject, setMainDataObject] = useState("");
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = searchParams.get("category");
  const page = searchParams.get("page");

  const handlePageChange = (page) => {
    const currentQueryURL = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentQueryURL, page: page });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { category: getParam, page: page },
        });
        setProducts(response.data.products);
        setMainDataObject(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, [getParam, page]);

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

      {mainDataObject && (
        <Pagination
          totalPosts={mainDataObject.totalProducts}
          postPerPage={8}
          handleClick={handlePageChange}
        />
      )}
    </section>
  );
};

export default ProductsList;
