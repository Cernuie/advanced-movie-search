import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./Register.scss"


export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

 
  const register = (username, email, password) => {
    const url = "/api/users/register"

    return axios
      .post(url, {username, email, password})
      .then(res => {
        if (res.data && res.data.token) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          props.setUser(res.data.username)
          props.setToken(res.data.token)
          history.push("/")
        }
        if(res.data && res.data.error) {
          setMessage(res.data.error)
        }  
        return res.data;
      });
  }

  const validate = () => {

    if(!username) {
      setMessage("Username cannot be blank");
      return;
    } else if (!email) {
      setMessage("Email cannot be blank");
      return;
    } else if (!password) {
      setMessage("Password cannot be blank");
      return;
    } else {
      setMessage("");
      register(username, email , password)
    }
  }

  return(
    <section>
      <div className="register-container">
        <div id="registerPage">
          <header className="register-header">Register</header>
          {message && <div className="alert alert-danger">{message}</div>}
          <form className="form-container" onSubmit={event => event.preventDefault()}>
          <div>
            <label>
              
            </label>
            <input type="username" placeholder="Enter username" value={username} onChange={event => setUsername(event.target.value)}/>
          </div>
          <div>
            <label>
              
            </label>
            <input type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div>
            <label>
          
            </label>
            <input type="password" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={validate}>Submit</button>
        </form>
        </div>
        
        
      </div>
    </section>
  )
}