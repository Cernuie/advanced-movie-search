import React, { Fragment, useState, useEffect } from "react";
// import axios from "axios";

import SearchBar from "./SearchBar";
import Results from "./Results"
const axios = require('axios');

export default function MovieSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?s=${term}&apikey=4a3b711b`
    
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data )
        console.log(response.data.Search);
        setResults([...response.data.Search]);
      })
      .catch((e) => console.log(`error ${e}`));
  }, [term]);

  return (
    <Fragment>
      <SearchBar onSearch={term => setTerm(term)} />
      <div class="movieStyles">
        <Results results={results} />
      </div>
    </Fragment>
  );
}
