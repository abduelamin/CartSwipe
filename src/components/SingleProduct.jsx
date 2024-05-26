import React, { useEffect, useState } from "react";
import "../styles/SingleProduct.css";
import config from "../config.json";
import QuantityCount from "./QuantityCount";
import { useParams } from "react-router-dom";
import apiClient from "../utils/api-client";

const SingleProduct = ({ addToCart }) => {
  const [count, setCount] = useState(0);
  const [pic, setPic] = useState("");

  const [products, setProducts] = useState([]);

  const { id } = useParams();

  const singleProductArray = products.filter((prod) => prod.title === id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
        // console.log(fullProductList);
        setProducts(fullProductList);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProducts();
  }, []);

  // Try this, grab all the prodcuts from each page speararelty, join them to an array and then filter that array.

  return (
    <section className="align_center single_product">
      <div className="align_center">
        <div className="single_product_thumbnails">
          {singleProductArray.length > 0 &&
            singleProductArray[0].images.map((image, index) => (
              <img
                key={index}
                src={`${config.backendURL}/products/${image}`}
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
                ? `${config.backendURL}/products/${pic}`
                : `http://localhost:5000/products/${singleProductArray[0].images[0]}`
            }
            alt={singleProductArray[0].images[0]}
            className="single_product_display"
          />
        )}
      </div>

      <div className="single_product_details">
        {singleProductArray.length > 0 && (
          <h1 className="single_product_title">
            {singleProductArray[0].title}
          </h1>
        )}
        {singleProductArray.length > 0 && (
          <p className="single_product_description">
            {singleProductArray[0].description}
          </p>
        )}
        {singleProductArray.length > 0 && (
          <p className="single_product_price">
            ${singleProductArray[0].price.toFixed(2)}
          </p>
        )}

        <h2 className="quantity_title">Quantity:</h2>
        <div className="align_center quanitity_input">
          <QuantityCount count={count} setCount={setCount} />
        </div>

        <button
          className="searh_button add_cart"
          onClick={() => addToCart(singleProductArray[0], count)} // This takes the 'product' and 'count' (from quantityCount componenet)
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default SingleProduct;
