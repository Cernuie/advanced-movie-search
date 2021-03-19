import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
        setUser(response.data.email)
      })
  }, [setUser])


  return (
    <nav>
      <div className="flex-space">
        {isLoggedIn}
        <div><a href="/"> Back to Home </a> </div>
        <div>{!isLoggedIn && <a href="/login"> Login </a>} </div>
        <div>{!isLoggedIn && <a href="/register"> Register </a>}  </div>
        <div>{isLoggedIn && <a href="/favorites"> My Favorites </a>}   </div>
        <div>{isLoggedIn && <a href="/watchlist"> My Watch List </a>}  </div>
        <div>{isLoggedIn && <button onClick={handleLogout}>Log Out</button>} </div>
      </div>
    </nav>
  )
}