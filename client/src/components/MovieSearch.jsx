import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import Results from "./Results";

import "./MovieSearch.scss"

const API_KEY = process.env.REACT_APP_OMDB_KEY;

export default function MovieSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("movies");

  useEffect(() => {
    let apiUrl = "";
    if (filter === "movies") {
      apiUrl = `https://www.omdbapi.com/?s=${term}?&type=movie&apikey=${API_KEY}`;
    }
    if (filter === "shows") {
      apiUrl = `https://www.omdbapi.com/?s=${term}?&type=series&apikey=${API_KEY}`;
    }
    

    axios
      .get(apiUrl)
      .then((response) => {
        const existingIds = new Set()
        const filteredResponse = response.data.Search.filter((obj) => !existingIds.has(obj.imdbID) && existingIds.add(obj.imdbID))
        // console.log("filtered:", filteredResponse)
        setResults(filteredResponse);
      })
      .catch((e) => console.log(`error ${e}`));
  }, [term, filter]);

  return (
    <Fragment>
      <div className="flex-centre">
      <select
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
      >
        <option value="movies">Movies</option>
        <option value="shows">TV Shows</option>
      </select>
      <SearchBar onSearch={(term) => setTerm(term)} />
      </div>
      <div className="movieStyles">
        <Results results={results} />
      </div>
    </Fragment>
  );
}

//