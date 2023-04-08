import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/search.css";

function Search({ selectedTypes, setSelectedTypes }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json"
      );
      setTypes(response.data.map((type) => type.english));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  return (
    <div>
      <h1 className="search-title">Search By Type:</h1>
      <div className="checkbox-container">
        {types.map((type) => (
          <div key={type} className="checkbox-item">
            <input
              type="checkbox"
              value={type}
              id={type}
              onChange={handleChange}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
