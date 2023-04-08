import React, {useState} from "react";
import PokemonDetails from "./PokemonDetails";
import "./css/page.css";

function Page({ pokemons, PAGE_SIZE, currentPage }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null); 
  // slice pokemon array based on current page and page size
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  pokemons = pokemons.slice(startIndex, endIndex);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon); // Set the selected Pokemon in state
  };

  return (
    <div>
      <h1 className="page-title">Selected Pokemon:</h1>
      <PokemonDetails pokemon={selectedPokemon}/>
      <h1 className="page-title">Search Results:</h1>
      <div className="image-container">
        {pokemons.map((pokemon) => {
          const pokemonId = String(pokemon.id).padStart(3, "0");
          return (
            <div key={pokemonId} className="pokemon-image-container">
              <img
                className="pokemon-image"
                alt={pokemon.name.english}
                src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemonId}.png`}
                onClick={() => handlePokemonClick(pokemon)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
