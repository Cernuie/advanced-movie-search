import React from "react";

export default function Header(props) {
  return (
    <header className="titleBar">
      <h2> {props.text} </h2>
      <h1> Test </h1>
    </header>
  );
};

