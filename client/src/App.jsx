import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import MovieSearch from "./components/MovieSearch";

const axios = require("axios");

function App() {
  const [user, setUser] = useState(null);
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
