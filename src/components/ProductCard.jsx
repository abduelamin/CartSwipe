import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductCard.css";
import config from "../config.json";
import { NavLink } from "react-router-dom";
import cartContext from "../Contexts/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(cartContext);

  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product.title}`}>
          <img
            src={`https://cartswipe-backend.onrender.com/products/${product.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product_details">
        <h3 className="product_price">$ {product.price}</h3>
        <p className="product_title">{product.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <FontAwesomeIcon
                icon={regularStar}
                style={{ marginRight: "10%" }}
              />
              {product.reviews.rate}
            </p>
            <p className="product_review_count">{product.reviews.counts}</p>
          </div>

          <button className="add_to_cart ">
            <FontAwesomeIcon
              icon={faBasketShopping}
              style={{
                fontSize: "200%",
                color: "#fff",
              }}
              onClick={() => addToCart(product, 1)}
            />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
