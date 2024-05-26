import React, { useEffect, useState } from "react";
import "../styles/ProductsList.css";
import ProductCard from "./ProductCard";
import api from "../utils/api-client";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import LoadingSpinner from "./Loading";

const ProductsList = () => {
  const [loading, setLoading] = useState(true);
  // This is access products server which gives details about all products i.e. total products, products themselves etc.. This is mainly used for our pagination component to determine the total products counts
  const [mainDataObject, setMainDataObject] = useState("");

  // This for accessing the single products
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Pagination needs to use the usesearchparams() and the config object in axios. we grab the search query and add it to the axios config obj therefore only making a request based on the page number. We can add more query to our search params using object.fromEntries.
  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = searchParams.get("category");
  const page = searchParams.get("page");

  const searchQuery = searchParams.get("search");

  const handlePageChange = (page) => {
    const currentQueryURL = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentQueryURL, page: page });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { search: searchQuery, category: getParam, page: page },
        });

        setProducts(response.data.products);
        setMainDataObject(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [getParam, page, searchQuery]);

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
        {loading ? (
          <LoadingSpinner />
        ) : (
          products.map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })
        )}
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
