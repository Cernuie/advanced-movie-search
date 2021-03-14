import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Search() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?s=avengers&apikey=4a3b711b`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setResults([...response.data.Search]);
        console.log(results);
      })
      .catch((e) => console.log(`error ${e}`));
  }, []);

  return <h1> hello </h1>;
}
