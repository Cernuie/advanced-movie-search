import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function NavBar(props) {
  const history = useHistory();

  const handleLogout = () => {
    props.setUser("");
    localStorage.clear();
    history.push("/")
  }

  const isLoggedIn = props.user ? `${props.user} is logged in` : "";

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      props.setUser(foundUser);
    }
  }, [props.setUser]);

  return (
      <nav>
        {isLoggedIn}
        <ul>
          <li>
            <a href="/"> Home </a>
          </li>
          <li>
            <a href="/login"> Login </a>
          </li>
          <li>
            <a href="/register"> Register </a>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </nav>
  )
}