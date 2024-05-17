import React, { useState } from "react";
import "../styles/QuantityCount.css";
const QuantityCount = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <>
      {!count ? (
        <button className="quantity_input_button" disabled>
          -
        </button>
      ) : (
        <button onClick={handleDecrease} className="quantity_input_button">
          -
        </button>
      )}
      <p className="quantity_input_count">{count}</p>
      <button onClick={handleIncrease} className="quantity_input_button">
        +
      </button>
    </>
  );
};

export default QuantityCount;
