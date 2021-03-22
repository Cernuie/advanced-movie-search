import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import './NavBar.scss'

export default function NavBar({ setToken, setUser, token, user }) {
  const history = useHistory();

  const handleLogout = () => {
    setToken("");
    setUser("");
    localStorage.clear();
    history.push("/")
  }
  const isLoggedIn = token ? `${user} is logged in` : "";

  useEffect(() => {
    const loggedToken = localStorage.getItem("token")
    if (loggedToken) {
      const foundToken = JSON.parse(loggedToken);
      setToken(foundToken);
    }
  }, [setToken]);

  useEffect(() => {
    const loggedToken = localStorage.getItem("token")
    axios.get(
      "/api/users/verify",
      {
        headers: { "Authorization": loggedToken }
      },
    )
      .then(response => {
        console.log(response)
        setUser(response.data.username)
      })
  }, [setUser])


  return (
    <nav>
      <div>
      <div className="flex-space">
      <div className="username">
        {isLoggedIn}
      </div>
      <div className="flex-lists">
        <div>
        <a href="/"> Back to Home </a> 
        </div>
        <div>
        {isLoggedIn && <a href="/favorites"> My Favorites </a>} 
        </div>
        <div>
        {isLoggedIn && <a href="/watchlist"> My Watch List </a>}
        </div>
        </div>
        <div className="flex-account">
        {!isLoggedIn && <a href="/login"> Login </a>} 
        {!isLoggedIn && <a href="/register"> Register </a>}    
        {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Log Out</button>} 
        </div>
        </div>
      </div>
    </nav>
  )
}