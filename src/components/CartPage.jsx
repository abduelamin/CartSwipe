import React from "react";
import "../styles/CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import user from "../assets/iphone.jpg";
import Table from "./Table";
import QuantityCount from "./QuantityCount";

const CartPage = () => {
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img src={user} alt="user profile" />{" "}
        <div>
          <p className="user_name">James</p>
          <p className="user_email">James@gmail.com</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          <tr>
            <td>Iphone 14</td>
            <td>$999</td>
            <td className="align_center table_quantity_input">
              <QuantityCount />
            </td>
            <td>$999</td>
            <td>
              {" "}
              <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
            </td>
          </tr>
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>$999</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>$1004</td>
          </tr>
        </tbody>
      </table>

      <button className="checkout_button">Checkout</button>
    </section>
  );
};

export default CartPage;
