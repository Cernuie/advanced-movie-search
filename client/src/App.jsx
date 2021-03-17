import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MovieOverview from "./components/MovieOverview";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import StreamablePlayer from "./components/StreamablePlayer";
import UseVideoFinder from "./hooks/UseVideoFinder";

function App() {
  const [user, setUser] = useState("")
  const [video, setVideo] = useState({})
 
  useEffect(() => {
    const fetchAPI = async () => {
      const video = await UseVideoFinder()
      setVideo(video);
    };
    fetchAPI();
  }, [])

  const [token, setToken] = useState("")
  return (
    <Router>
      <div>
        <h1 className="centre">Advanced Movie Search App:</h1>
        <NavBar {... {user,token, setToken, setUser}} />
        <Switch>
          <Route path="/movie/:id">
            <MovieOverview />
          </Route>
          <Route path="/login">
            <Login {... {setUser, setToken}} />
          </Route>
          <Route path="/register">
            <Register {... {setUser, setToken}}/>
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
