import React from "react";
import "./css/pokemon-details.css"; // Import CSS file for PokemonDetails component

const PokemonDetails = ({ pokemon }) => {
  const pokemonId = String(pokemon?.id).padStart(3, "0");

  if (!pokemon) {
    return (
      <div className="pokemon-details-container">
        <h2 className="pokemon-name">NO POKEMON SELECTED</h2>
      </div>
    );
  }
  return (
    <div className="pokemon-details-container">
      {" "}
      {/* Apply container class for styling */}
      <h2 className="pokemon-name">{pokemon.name.english}</h2>{" "}
      {/* Apply class for styling */}
      <img
        className="pokemon-image"
        alt={pokemon.name.english}
        src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemonId}.png`}
      />
      <div className="base-stats-container">
        {" "}
        {/* Apply container class for styling */}
        <h3 className="section-title">Base Stats</h3>{" "}
        {/* Apply class for styling */}
        <ul className="base-stats-list">
          {" "}
          {/* Apply list class for styling */}
          <li>
            <span className="stat-label">HP:</span>{" "}
            <span className="stat-value">{pokemon.base.HP}</span>{" "}
            {/* Apply class for styling */}
          </li>
          <li>
            <span className="stat-label">Attack:</span>{" "}
            <span className="stat-value">{pokemon.base.Attack}</span>{" "}
            {/* Apply class for styling */}
          </li>
          <li>
            <span className="stat-label">Defense:</span>{" "}
            <span className="stat-value">{pokemon.base.Defense}</span>{" "}
            {/* Apply class for styling */}
          </li>
          <li>
            <span className="stat-label">Speed:</span>{" "}
            <span className="stat-value">{pokemon.base.Speed}</span>{" "}
            {/* Apply class for styling */}
          </li>
          <li>
            <span className="stat-label">Special Attack:</span>{" "}
            <span className="stat-value">{pokemon.base["Speed Attack"]}</span>{" "}
            {/* Apply class for styling */}
          </li>
          <li>
            <span className="stat-label">Special Defense:</span>{" "}
            <span className="stat-value">{pokemon.base["Speed Defense"]}</span>{" "}
            {/* Apply class for styling */}
          </li>
        </ul>
      </div>
      <div className="types-container">
        {" "}
        {/* Apply container class for styling */}
        <h3 className="section-title">Types</h3> {/* Apply class for styling */}
        <ul className="types-list">
          {" "}
          {/* Apply list class for styling */}
          {pokemon.type.map((type, index) => (
            <li key={index} className="type">
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
