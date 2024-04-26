import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductCard.css";

import iphonefront from "../assets/iphonefront.jpg";
import iphone from "../assets/iphone.jpg";

const ProductCard = ({ price, productName }) => {
  return (
    <article className="product_card">
      <div className="product_image">
        <a href="product1">
          <img src={iphonefront} alt="product image" />
        </a>
      </div>
      <div className="product_details">
        {/* {price} <br />
        {productName} */}
        <h3 className="product_price">$999</h3>
        <p className="product_title">iphone 14 Pro</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <FontAwesomeIcon
                icon={regularStar}
                style={{ marginRight: "10%" }}
              />
              5.0
            </p>
            <p className="product_review_count">120</p>
          </div>

          <button className="add_to_cart ">
            <FontAwesomeIcon
              icon={faBasketShopping}
              style={{
                fontSize: "200%",
                color: "#fff",
              }}
            />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
