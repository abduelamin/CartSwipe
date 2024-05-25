import React, { useState } from "react";
import "../styles/QuantityCount.css";
const QuantityCount = ({
  count,
  setCount,
  quantity,
  updateCartQuantity,
  productID,
  cartPage,
}) => {
  // const [count, setCount] = useState(0);

  const handleIncrease = () => {
    cartPage
      ? updateCartQuantity("increase", productID)
      : setCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    cartPage
      ? updateCartQuantity("decrease", productID)
      : setCount((prev) => prev - 1);
  };

  const isDecrementDisabled = cartPage ? quantity <= 1 : count <= 0;

  return (
    <>
      <button
        onClick={handleDecrease}
        className="quantity_input_button"
        disabled={isDecrementDisabled}
      >
        -
      </button>
      <p className="quantity_input_count">{cartPage ? quantity : count}</p>
      <button onClick={handleIncrease} className="quantity_input_button">
        +
      </button>
    </>
  );
};

export default QuantityCount;
