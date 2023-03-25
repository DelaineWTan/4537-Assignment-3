import React from "react";
import "./style.css";

function Pagination({ pokemons, PAGE_SIZE, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  for (
    let i = Math.max(0, currentPage - 6);
    i <= Math.min(Math.floor(pokemons.length / PAGE_SIZE), currentPage + 3);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <button
        disabled={currentPage < 2}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber + 1}
          className={currentPage === pageNumber + 1 ? "buttonActive" : ""}
          onClick={() => setCurrentPage(pageNumber + 1)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        disabled={currentPage > Math.floor(pokemons.length / PAGE_SIZE)}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
