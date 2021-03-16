import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import MovieOverview from "./components/MovieOverview";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState()

  function isLoggedIn() {
    if (user) return `${user} is logged in`
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser("");
    localStorage.clear();
  }
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
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>
        <h1 className="centre">Advanced Movie Search App:</h1>
        <Switch>
          <Route path="/movie/:id">
            <MovieOverview />
          </Route>
          <Route path="/login">
            <Login setUser={setUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
          <div>{isLoggedIn()}</div>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;