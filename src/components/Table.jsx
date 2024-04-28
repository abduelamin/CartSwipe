import React from "react";
import "../styles/Table.css";

const Table = ({ headings, children }) => {
  return (
    <table className="common_table">
      <thead>
        {headings.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </thead>

      {children}
    </table>
  );
};

export default Table;
