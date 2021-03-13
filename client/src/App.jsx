import React, { useState, useEffect } from 'react'
import './App.css';
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const axios = require('axios');

const App = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  let url = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setMovies(response.data.Search)
        setLoading(false)
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

  axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    .then((response) => {
      console.log(response.data)
      if (response.data.Response === "True") {
   
        setMovies(response.data.Search)
        setLoading(false)
      }
    })
    .catch((error) => console.error(`Error: ${error}`))

  }


  return (
    <div className="App">
      <Header text="Advanced Movie Search" />
      <Search search={search} />
      <p className="App-intro"> Favourite movies here</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span> 
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </div>

  );
}

export default App;
