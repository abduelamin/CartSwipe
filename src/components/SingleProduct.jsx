import React, { useState } from "react";
import "../styles/SingleProduct.css";

import product from "../../sampleproduct";

const SingleProduct = () => {
  const [pic, setPic] = useState("");

  return (
    <section className="align_center single_product">
      <div className="align_center">
        <div className="single_product_thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.title}
              className={pic === image ? "selected_image" : null}
              onClick={() => setPic(image)}
            />
          ))}
        </div>
        <img
          src={pic ? pic : product.images[0]}
          alt={product.title}
          className="single_product_display"
        />
      </div>

      <div className="single_product_details">
        <h1 className="single_product_title">{product.title}</h1>
        <p className="single_product_description">{product.description}</p>
        <p className="single_product_price">${product.price.toFixed(2)}</p>

        <h2 className="quantity_title">Quantity:</h2>
        <div className="align_center quanitity_input">
          <button className="quantity_input_button" disabled>
            -
          </button>
          <p className="quantity_input_count">1</p>
          <button className="quantity_input_button"> + </button>
        </div>

        <button className="searh_button add_cart">Add to cart</button>
      </div>
    </section>
  );
};

export default SingleProduct;
