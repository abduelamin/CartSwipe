import React, { useEffect } from "react";
import "../../styles/Logout.css";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);

  return <h1>Logout</h1>;
};

export default Logout;
