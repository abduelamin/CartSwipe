import React from "react";
import "../styles/Pagination.css";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalPosts, postPerPage, handleClick }) => {
  let pages = [];

  // I used searchParams here so that I can add an effect on the button when the user is on the selected page. I need to grab the query result and compare it to the button page number using loose comparisos otherwise I'd have o use parseInt since the query is a string.
  const [search, setSearch] = useSearchParams();
  const activePage = search.get("page");

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      {pages.map(
        (page) =>
          pages.length > 1 && (
            <li key={page}>
              <button
                className={
                  activePage == page
                    ? "currentPage pagination_button"
                    : "pagination_button"
                }
                onClick={() => handleClick(page)}
              >
                {page}
              </button>
            </li>
          )
      )}
    </ul>
  );
};

export default Pagination;
