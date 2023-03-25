import React from "react";
import "./style.css";

function Pagination({ pokemons, PAGE_SIZE, currentPage, setCurrentPage }) {

  return (
    <div>
      <button disabled={currentPage < 2} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      {Array.from(
        { length: Math.ceil(pokemons.length / PAGE_SIZE) },
        (element, index) => index
      ).map((number) => (
        <button key={number + 1} className={currentPage === number + 1 ? "buttonActive" : ""} onClick={() => setCurrentPage(number + 1)}>
          {number + 1}
        </button>
      ))}
      <button disabled={currentPage > Math.floor(pokemons.length / PAGE_SIZE)} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
