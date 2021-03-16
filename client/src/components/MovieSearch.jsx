import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import Results from "./Results";
// const axios = require("axios");

export default function MovieSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("movies");

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?s=${term}&apikey=4a3b711b`;

    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("movieSearch", response.data.Search);
        setResults([...response.data.Search]);
      })
      .catch((e) => console.log(`error ${e}`));
  }, [term, filter]);

  return (
    <Fragment>
      <select
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
      >
        <option value="movies">Movies</option>
        <option value="shows">TV Shows</option>
      </select>
      <SearchBar onSearch={(term) => setTerm(term)} />
      <div className="movieStyles">
        <Results results={results} />
      </div>
    </Fragment>
  );
}
