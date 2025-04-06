import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== "") {
      onCityChange(inputCity);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-icon-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;