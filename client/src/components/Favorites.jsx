import axios from "axios";
import React, { useEffect, useState } from "react";
import deleteFavorite from "../hooks/useDeleteFavorite";

export default function Favorites({ user, token, setUser, setToken }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("/api/favorites", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        const promises = [];
        for (let movie of response.data.imdbID) {
          const imdbID = movie.imdb_id;
          let movieDetails = `https://www.omdbapi.com/?i=${imdbID}&apikey=4a3b711b`;

          const movieDetailPromise = axios
            .get(movieDetails)
            .then((response) => {
              return response.data;
            });
          promises.push(movieDetailPromise);
        }
        return Promise.all(promises);
      })
      .then((movieDetails) => {
        setFavorites(movieDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {favorites.map((movie) => {
        return (
          <ul key={movie.imdbID}>
            <li>Title: {movie.Title}</li>
            <li>
              Release Year: {movie.Year}
              test
            </li>
            {movie.Type === "series" && <li> TV Series </li>}
            {movie.Type === "movie" && <li> Movie </li>}
            <li>Your Rating Here: 8.7/10</li>
            <button type="button" onClick={() => deleteFavorite()}>
              {" "}
              Remove from Favorites{" "}
            </button>
          </ul>
        );
      })}
    </div>
  );
}
