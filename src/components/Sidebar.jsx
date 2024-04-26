import React from "react";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>

      <div className="category_links">
        <NavLink>Gaming</NavLink>
        <NavLink>HeadPhones</NavLink>
        <NavLink>Laptops</NavLink>
        <NavLink>Phones</NavLink>
        <NavLink>Smart Watches</NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
