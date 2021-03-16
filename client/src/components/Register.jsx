import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

 
  const register = (email, password) => {
    const url = "/api/users/register"

    return axios
      .post(url, {email, password})
      .then(res => {
        if (res.data) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          props.setUser(res.data.token);
          history.push("/")
        }
        return res.data;
      });
  }

  const validate = () => {
    if (!email) {
      setMessage("Email cannot be blank");
      return;
    }  else if (!password) {
      setMessage("Password cannot be blank");
      return;
    } else {
      setMessage("");
      register(email , password)
    }
  }

  return(
    <section>
      <div>
        <div>
          <header>Register:</header>
        </div>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={event => event.preventDefault()}>
          <div>
            <label>
              Email Address:
            </label>
            <input type="email" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div>
            <label>
              Password:
            </label>
            <input type="password" placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button type="button" onClick={validate}>Submit</button>
        </form>
      </div>
    </section>
  )
}