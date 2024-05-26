import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { NavLink, useSearchParams } from "react-router-dom";
import api from "../utils/api-client";
import config from "../config.json";
import LoadingSpinner from "./Loading";

const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("/category");
        setCategory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>

      <div className="category_links">
        {Error && <em style={{ color: "red" }}>{Error}</em>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          category.map((cat, index) => {
            return (
              <NavLink to={`/products?category=${cat.name}`} key={index}>
                {cat.name}
              </NavLink>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
