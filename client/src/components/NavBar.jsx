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
      <div >
      <div className="flex-space">
        {isLoggedIn && <div className="btn-style">
        {isLoggedIn}
      </div>}
      <div className="flex-lists">
        <div>
        <a href="/" className="btn-style"> Back to Home </a> 
        </div>
        <div>
        {isLoggedIn && <a href="/favorites" className="btn-style"> My Favorites </a>} 
        </div>
        <div>
        {isLoggedIn && <a href="/watchlist" className="btn-style"> My Watch List </a>}
        </div>
        </div>
        <div className="flex-account">
        {!isLoggedIn && <a href="/login" className="btn-style"> Login </a>} 
        {!isLoggedIn && <a href="/register" className="btn-style"> Register </a>}    
        {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Log Out</button>} 
        </div>
        </div>
      </div>
    </nav>
  )
} 