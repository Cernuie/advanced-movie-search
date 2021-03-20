import axios from "axios";
import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"

export default function Favorites({ user, token, setUser, setToken }) {
  const [favorites, setFavorites] = useState([]);

  let history = useHistory()

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


  const removeMediaFromFavoritesPage = (id, index, title) => {

    axios.delete(`/api/favorites/new?movieID=${id}`, {
      headers: { "Authorization": localStorage.getItem("token") },
    }).then((response) => {
      console.log("delete passed", response)
      console.log("deletion is here", response.data.deletion)
      if (response.data.deletion === "true") {
        // console.log("inside the if statement")
        const favoritesList = [...favorites]
        // console.log("fav list", favoritesList)
        favoritesList.splice(index, 1);
        setFavorites(favoritesList)
        alert(`You have deleted ${title} from your favorites!`)
      }
    })
  }

  return (
    <div className="flex">
      {favorites.map((movie, index) => {
        return (
          <ul key={movie.imdbID}>
            <li>Title: {movie.Title}</li>
            <li>
              Release Year: {movie.Year}
            </li>
            <li><img onClick={() => history.push(`/movie/${movie.imdbID}`)} src={movie.Poster} width="200px" height="300px"/></li>
            {movie.Type === "series" && <li> Type: TV Series </li>}
            {movie.Type === "movie" && <li> Type: Movie </li>}
            <li>Your Rating Here: 8.7/10</li>
            <button type="button" onClick={() => removeMediaFromFavoritesPage(movie.imdbID, index, movie.Title)}>
              {" "}
              Remove from Favorites{" "}
            </button>
          </ul>
        );
      })}
    </div>
  );
}