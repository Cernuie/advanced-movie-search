<<<<<<< HEAD
import React from 'react';
import { useState } from 'react'
=======
import React, { useState, useEffect } from 'react'
import './App.css';
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";
>>>>>>> origin/movie-search-test-framework

const axios = require('axios');

<<<<<<< HEAD
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login'

=======
const App = () => {
>>>>>>> origin/movie-search-test-framework

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

<<<<<<< HEAD
function App() {
  const [token, setToken] = useState();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login setToken={setToken}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
=======

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
>>>>>>> origin/movie-search-test-framework
      </div>
    </div>

  );
}

export default App;
