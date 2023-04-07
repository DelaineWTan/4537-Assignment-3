import axios from "axios";
import { useEffect, useState } from "react";
// Components
import LoginForm from "./LoginForm";
import Authenticated from "./Authenticated";
import Page from "./Page";
import Pagination from "./Pagination";
import Search from "./Search";
import Dashboard from "./Dashboard";

function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // App State
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemons, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    // Check local storage for login status value
    const storedLoginStatus = localStorage.getItem("isLoggedIn");

    // If login status value is found in local storage, set initial state accordingly
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    const isAdmin = localStorage.getItem("refreshToken");
    if (isAdmin) setIsAdmin(isAdmin);
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

  if (!isLoggedIn) {
    return (
      <div className="App">
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setAccessToken={setAccessToken}
          setRefreshToken={setRefreshToken}
          setIsAdmin={setIsAdmin}
        />
      </div>
    );
  }
  return (
    <div className="App">
      <Authenticated
        setIsLoggedIn={setIsLoggedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        refreshToken={refreshToken}
      >
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
        {isAdmin && <Dashboard accessToken={accessToken} />}
      </Authenticated>
    </div>
  );
}

export default App;
