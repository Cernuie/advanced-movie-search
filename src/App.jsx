import { useState } from 'react'

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

function App() {
  return (

    <div className="App">
      <Home />
      <Login />
      <Register />
    </div>

  );
}

export default App;
