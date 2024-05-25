import React, { useContext, useEffect, useState } from "react";
import "../styles/MyOrder.css";
import Table from "./Table";
import cartContext from "../Contexts/cartContext";
import { myOrdersAPI } from "../services/CheckOut";
import product from "./../../sampleproduct";
const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // When user clicks checkout button on cartpage, it sends the data
        const response = await myOrdersAPI();

        setOrders(response.data);
      } catch (error) {}
    };

    fetchOrders();
  }, []);

  const getAllProducts = (order) => {
    const innerArray = order.products.map(
      (item) => `${item.product.title}(${item.quantity})`
    );

    return innerArray.join(", ");
  };
  return (
    <section className="align_center myorder_page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getAllProducts(order)}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrder;
