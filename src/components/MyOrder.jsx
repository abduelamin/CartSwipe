import React from "react";
import "../styles/MyOrder.css";
import Table from "./Table";
const MyOrder = () => {
  return (
    <section className="align_center myorder_page">
      <Table headings={["Order", "Products", "Total", "Status"]}>
        <tbody>
          <tr>
            <td>1</td>
            <td>Iphone 14, Power Bank</td>
            <td>$1299</td>
            <td>Shipped</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrder;
