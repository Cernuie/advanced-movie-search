import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Search from "./components/Search";

const axios = require("axios");

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <h1>Advanced Movie Search App:</h1>
        <Switch>
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
