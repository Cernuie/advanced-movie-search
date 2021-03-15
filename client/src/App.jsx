import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import MovieSearch from "./components/MovieSearch";

import MovieCarousel from "./components/MovieCarousel";
const axios = require('axios');

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState();
  const [movies, setMovies] = useState([]);
  const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=b982a0ac1f7e5b7165da37d7d73cfb13&language=en-US&page=1`;

  const posterUrl = 'https://image.tmdb.org/t/p/original/';


  useEffect(() => {

    axios.get(apiUrl).then((response) => {
      const data = response.data.results.map((m) => ({
        id: m['id'],
        backPoster: posterUrl + m['backdrop_path'],
        title: m['title'],
      }))
      console.log(data);
      setMovies(data);

    })
  }, []);







  // useEffect(() => {
  //   const apiUrl = `https://www.omdbapi.com/?s=${term}&apikey=4a3b711b`;

  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       console.log("movieSearch", response.data.Search);
  //       setResults([...response.data.Search]);
  //     })
  //     .catch((e) => console.log(`error ${e}`));
  // }, [term]);

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

        <h1 class="centre">Advanced Movie Search App:</h1>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <MovieSearch />
            <MovieCarousel movies={movies} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
