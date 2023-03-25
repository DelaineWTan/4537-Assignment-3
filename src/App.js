import Page from "./Page";
import Pagination from "./Pagination";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const PAGE_SIZE = 10;
  const [pokemons, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
      setPokemon(result.data);
    }
    fetchData()
    
  }, [])

  return (
    <div className="App">
      <Page pokemons={pokemons} PAGE_SIZE={PAGE_SIZE} currentPage={currentPage}/>
      <Pagination/>
    </div>
  );
}

export default App;
