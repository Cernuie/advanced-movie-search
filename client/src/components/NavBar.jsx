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
      {isLoggedIn}
      <ul>
        <li>
          <a href="/"> Home </a>
        </li>
        <li>{!isLoggedIn && <a href="/login"> Login </a>}</li>
        <li>{!isLoggedIn && <a href="/register"> Register </a>}</li>
        <li>
          {
            isLoggedIn && <a href="/favorites">My Favorites</a>
          }
          {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
        </li>
      </ul>
    </nav>
  )
}