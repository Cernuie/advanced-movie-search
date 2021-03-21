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
    return axios.post(
      "/api/users/login",
      {
      email: email,
      password: password
      },
    )
    .then(res => {
      if (res.data && res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        props.setToken(res.data.token);
        props.setUser(res.data.username);
        history.push("/")
      }
      if(res.data && res.data.error) {
        setMessage(res.data.error)
      }
      return res.data;
    });
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
      handleSubmit(email.toLowerCase(), password)
      .catch(err => console.log(err));
    }
  }

  return(
    <section>
      <div className="login-container">
      <div id="loginPage">
        <header className="login-header">Login</header>
        
        {message && <div className="alert alert-danger">{message}</div>}
        
        <form className="form-container" onSubmit={event => event.preventDefault()}>
          <div>
            <label></label>
            <input type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div>
            <label></label>
            <input type="password"  placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button type="button" onClick={validateForm} className="btn btn-primary">Submit</button>
        </form>
      </div>
      </div>
    </section>
  );
  }