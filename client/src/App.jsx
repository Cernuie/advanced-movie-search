import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MovieOverview from "./components/MovieOverview";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import UseVideoFinder from "./hooks/UseVideoFinder";
import Favorites from "./components/Favorites";
import Watchlist from "./components/Watchlist";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const video = await UseVideoFinder();
      setVideo(video);
    };
    fetchAPI();
  }, []);

  useEffect(() => {}, [token]);

  return (
    <Router>
      <div>
        <h1 className="centre">ASC Media Search</h1>
        <NavBar {...{ user, token, setToken, setUser }} />
        <Switch>
          <Route path="/movie/:id">
            <MovieOverview />
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
