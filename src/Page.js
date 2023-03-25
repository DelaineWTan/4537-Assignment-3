import React from "react";

function Page({ pokemons, PAGE_SIZE, currentPage }) {
  // slice pokemon array based on current page and page size
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  pokemons = pokemons.slice(startIndex, endIndex);
  return (
    <div className="image-container">
      {pokemons.map((pokemon) => {
        const pokemonId = String(pokemon.id).padStart(3, "0");
        return (
          <img
            className="image"
            alt={pokemon.name.english}
            src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemonId}.png`}
          />
        );
      })}
    </div>
  );
}

export default Page;
