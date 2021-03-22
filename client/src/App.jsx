import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MovieOverview from "./components/MovieOverview";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Favorites from "./components/Favorites";
import Watchlist from "./components/Watchlist";

function App() {
  const [user, setUser] = useState("")
  const [token, setToken] = useState("")

  return (
    <Router>
      <div>
        <div className="header">
          <h1 className="centre">ASC Media Search</h1>
          <NavBar {...{ user, token, setToken, setUser }} />
        </div>
        <Switch>
          <Route path="/movie/:id">
            <MovieOverview {...{user, token}}/>
          </Route>
          <Route path="/favorites">
            <Favorites {...{ user, token, setToken, setUser }} />
          </Route>
          <Route path="/watchlist">
            <Watchlist {...{ user, token, setToken, setUser }} />
          </Route>
          <Route path="/login">
            <Login {...{ setUser, setToken }} />
          </Route>
          <Route path="/register">
            <Register {...{ setUser, setToken }} />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
