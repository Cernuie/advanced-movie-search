import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Favorites({ user, token, setUser, setToken }) {
  const [favorites, setFavorites] = useState([])
  
  const favoritesList = [];

  useEffect(() => {
    axios.get(
      "/api/favorites",
      {
        headers: { "Authorization": localStorage.getItem("token") }
      }
    ).then(response => {
      for (let movie of response.data.movies) {
        favoritesList.push(movie);
      }
      setFavorites(favoritesList)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  
  
  return (
    <div>
      {favorites.map(movie => {
        return (
          <ul>
            <li>
              Title: {movie.title}
            </li>
            <li>
              Release Year: {movie.year}
            </li>
            {movie.type === "series" && <li> TV Series </li>}
            {movie.type === "movie" && <li> Movie </li>}
            <li>
              Your Rating Here: 8.7/10
            </li>
          </ul>
        )
      })}
    </div>
  )
}
