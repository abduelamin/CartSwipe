import React, { useState } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  // You will need to move this as a prop so that we can use statefunction when users clicks on add item
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="navbar align_center">
      <div className="align_center">
        <NavLink to="/">
          <h1 className="navbar_heading">CartSwipe</h1>
        </NavLink>
        <form className="navbar_form align_center">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="navbar_links align_center">
        <NavLink to="/" className="align_center">
          Home
        </NavLink>
        {/* Unsure if products page should have a page 1*/}
        <NavLink to="/products?page=1">Products</NavLink>
        {!user && (
          <>
            <NavLink to="login">Login</NavLink>
            <NavLink to="signup">Sign Up</NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="logout">Log Out</NavLink>
            <NavLink to="/myorders">My Orders</NavLink>
            <NavLink className="cart" to="/cart">
              Cart
              {cartCount ? (
                <div className="cart_items align_center ">{cartCount}</div>
              ) : null}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
