import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MovieOverview from "./components/MovieOverview";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState("")

  return (

    <Router>
      <div>
        <h1 className="centre">Advanced Movie Search App:</h1>
        <NavBar {... {user, setUser}} />
        <Switch>
          <Route path="/movie/:id">
            <MovieOverview />
          </Route>
          <Route path="/login">
            <Login {... {setUser}} />
          </Route>
          <Route path="/register">
            <Register {... {setUser}}/>
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
