import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ user, cartLength }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  return (
    <nav className="navbar align_center">
      <div className="align_center">
        <NavLink to="/">
          <h1 className="navbar_heading">CartSwipe</h1>
        </NavLink>
        <form className="navbar_form align_center" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
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
              {/* Im trying to have the cart nmuber to be shown all times*/}
              {/* {cartQuantityFromAPI.length ? (
                <div className="cart_items align_center ">
                  {cartQuantityFromAPI.length}
                </div>
              ) :  */}
              {cartLength ? (
                <div className="cart_items align_center ">{cartLength}</div>
              ) : null}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
