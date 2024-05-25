import React, { useEffect, useState, useContext } from "react";
import "../styles/CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import QuantityCount from "./QuantityCount";
import userContext from "../Contexts/userContext";
import cartContext from "../Contexts/cartContext";
import { checkoutAPI } from "../services/CheckOut";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const userObj = useContext(userContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(cartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => (total += item.product.price * item.quantity));

    setSubTotal(total);
  }, [cart]);

  const handleCheckOut = async () => {
    const oldcart = [...cart];

    setCart([]);

    // Look into API, as to why when I make this checkoutAPI request it works even if I don't add my cart in the body object
    try {
      await checkoutAPI(cart);
      toast.success("Your Order Has Been Submitted");
    } catch (error) {
      toast.error("Order Failed To Submit. Please Try Again");
      setCart(oldcart);
    }
  };
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${userObj?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => {
            return (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td className="align_center table_quantity_input">
                  <QuantityCount
                    quantity={quantity}
                    updateCartQuantity={updateCart}
                    productID={product._id}
                    cartPage={"true"}
                  />
                </td>
                <td>${quantity * product.price}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="checkout_button" onClick={handleCheckOut}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
