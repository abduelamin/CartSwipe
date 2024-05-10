import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { NavLink, useSearchParams } from "react-router-dom";
import api from "../utils/api-client";

const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const [Error, setError] = useState("");

  // const [searchParams, setSearchParams] = useSearchParams();
  // const getParam = searchParams.get("category");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("/category");
        setCategory(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategory();
  }, []);

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>

      <div className="category_links">
        {Error && <em style={{ color: "red" }}>{Error}</em>}
        {category.map((cat, index) => {
          return (
            <NavLink to={`/products?category=${cat.name}`} key={index}>
              {cat.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
