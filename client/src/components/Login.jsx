import React from 'react';
import axios from 'axios'
import { useState } from 'react'
import "./Login.scss"
import { useHistory } from "react-router-dom";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (email, password) => {
    axios.post(
      "/api/users/login",
      {
      email: email,
      password: password
      },
    )
    .then(res => {
      console.log(res)
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        props.setUser(res.data.email)
        props.setToken(res.data.token)
        history.push("/")
      }
      return res.data;
    })
  }

  const validateForm = () => {
    if (!email) {
      setMessage("Email cannot be blank");
      return;
    } else if (!password) {
      setMessage("Password cannot be blank");
      return;
    } else {
      setMessage("");
      handleSubmit(email, password)
    }
  }

  return(
    <section>
      <div>
      <div>
        <header>Login:</header>
        
        {message && <div>{message}</div>}
        
        <form onSubmit={event => event.preventDefault()}>
          <div>
            <label>Email Address:</label>
            <input type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password"  placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button type="button" onClick={validateForm}>Submit</button>
        </form>
      </div>
      </div>
    </section>
  );
  }