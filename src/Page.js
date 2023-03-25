import React from "react";

function Page({ pokemons, PAGE_SIZE, currentPage }) {
    // slice pokemon array based on current page and page size
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    pokemons = pokemons.slice(startIndex, endIndex)
  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h1>{pokemon.name.english}</h1>
        </div>
      ))}
    </div>
  );
}

export default Page;
