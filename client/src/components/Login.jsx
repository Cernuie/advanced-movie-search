import React from 'react';
import axios from 'axios'
import { useState } from 'react'
import "./Login.scss"

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    axios.post(
      "http://localhost:8080/login",
      {
      email: email,
      password: password
      },
    )
    .then(res => {
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        props.setToken(res.data.token);
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
      .catch(err => setMessage(err.response.data.error));
    }
  }

  return(
    <section className="page">
      <div className="login-container">
      <div id="loginPage">
        <header className="login-header">Login</header>
        
        {message && <div className="alert alert-danger">{message}</div>}
        
        <form className="form-container" onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={validateForm}>Submit</button>
        </form>
      </div>
      </div>
    </section>
  );
  }