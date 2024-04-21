import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Homepage />
      </main>
    </div>
  );
};

export default App;
