import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MovieOverview(props) {
  let urlId = window.location.pathname;
  let onlyId = urlId.substring(7);

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?i=${onlyId}&apikey=4a3b711b`;
    axios.get(apiUrl).then((response) => console.log("here", response.data));
  }, []);

  return <h1>Hello {onlyId}</h1>;
}
