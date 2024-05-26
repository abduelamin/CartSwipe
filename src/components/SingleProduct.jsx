import React, { useEffect, useState } from "react";
import "../styles/SingleProduct.css";
import config from "../config.json";
import QuantityCount from "./QuantityCount";
import { useParams } from "react-router-dom";
import apiClient from "../utils/api-client";
import LoadingSpinner from "./Loading";

const SingleProduct = ({ addToCart }) => {
  const [count, setCount] = useState(0);
  const [pic, setPic] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const singleProductArray = products.filter((prod) => prod.title === id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // The reason I did 3 separate API calls is because the backend end point wasn't working to give me the full list of products, therefore I adjusted and called all the pages. This is a small ecom store so this is fine for now but for bigger stores you need to get the backend endpoint working.
        const response = await apiClient.get("/products");
        const response2 = await apiClient.get("/products", {
          params: { page: 2 },
        });
        const response3 = await apiClient.get("/products", {
          params: { page: 3 },
        });

        const fullProductList = [
          ...response.data.products,
          ...response2.data.products,
          ...response3.data.products,
        ];

        setProducts(fullProductList);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="align_center single_product">
      <div className="align_center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="single_product_thumbnails">
              {singleProductArray.length > 0 &&
                singleProductArray[0].images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://cartswipe-backend.onrender.com/products/${image}`}
                    alt={image}
                    className={pic === image ? "selected_image" : null}
                    onClick={() => setPic(image)}
                  />
                ))}
            </div>
            {singleProductArray.length > 0 && (
              <img
                src={
                  pic
                    ? `https://cartswipe-backend.onrender.com/products/${pic}`
                    : `https://cartswipe-backend.onrender.com/products/${singleProductArray[0].images[0]}`
                }
                alt={singleProductArray[0].images[0]}
                className="single_product_display"
              />
            )}
          </>
        )}
      </div>

      <div className="single_product_details">
        {singleProductArray.length > 0 && (
          <>
            <h1 className="single_product_title">
              {singleProductArray[0].title}
            </h1>
            <p className="single_product_description">
              {singleProductArray[0].description}
            </p>
            <p className="single_product_price">
              ${singleProductArray[0].price.toFixed(2)}
            </p>
            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityCount count={count} setCount={setCount} />
            </div>
            <button
              className="search_button add_cart"
              onClick={() => addToCart(singleProductArray[0], count)} // This takes the 'product' and 'count' (from quantityCount component)
            >
              Add to cart
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
