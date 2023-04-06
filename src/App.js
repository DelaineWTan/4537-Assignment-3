import LoginForm from './LoginForm';
import Page from "./Page";
import Pagination from "./Pagination";
import Search from "./Search";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemons, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );
      setPokemon(result.data);
    }
    fetchData();
  }, []);

  const selectedPokemon = pokemons.filter((pokemon) =>
    selectedTypes.every((type) => pokemon.type.includes(type))
  );

  return (
    <div className="App">
      {!isLoggedIn && <LoginForm setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && (<div>
      <Search
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />
      <Page
        pokemons={selectedPokemon}
        PAGE_SIZE={PAGE_SIZE}
        currentPage={currentPage}
      />
      <Pagination
        pokemons={selectedPokemon}
        PAGE_SIZE={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </div>)}
    </div>
  );
}

export default App;
