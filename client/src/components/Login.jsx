import React from 'react';
import axios from 'axios'
import { useState } from 'react'
import "./Login.scss"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  return (
    <div className="Login">
      <Form >
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
  }