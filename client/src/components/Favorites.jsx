import axios from "axios";
import React, { useEffect, useState } from "react";
import deleteFavorite from "../hooks/useDeleteFavorite";

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
      console.log("response data here:", response.data)
      for (let movie of response.data.imdbID) {
       const imdbID = movie.imdb_id
        let movieDetails = `https://www.omdbapi.com/?i=${imdbID}&apikey=4a3b711b`

        axios.get(movieDetails).then((response) => {
          console.log(response.data)

          favoritesList.push(response.data);
          console.log("pushit", favoritesList);
        })
      }

      setFavorites(favoritesList);
    }).catch(error => {
      console.log(error)
    })
  }, [])

  
  
  return Object.keys(favorites).length > 0 ? (
    <div>
      {favoritesList.map(movie => {
        return (
          <ul>
            <li>
              Title: {movie.title}
            </li>
            <li>
              Release Year: {movie.Year}
              test
            </li>
            {movie.Type === "series" && <li> TV Series </li>}
            {movie.Type === "movie" && <li> Movie </li>}
            <li>
              Your Rating Here: 8.7/10
            </li>
            <button type="button" onClick={() => deleteFavorite()}> Remove from Favorites </button>
          </ul>
        )
      })}
    </div>
  ) : (
    <h2>Loading</h2>

  )
}


// return (
//   <div>
//     {favorites.map(movie => {
//       return (
//         <ul>
//           <li>
//             Title: {movie.title}
//           </li>
//           <li>
//             Release Year: {movie.year}
//           </li>
//           {movie.type === "series" && <li> TV Series </li>}
//           {movie.type === "movie" && <li> Movie </li>}
//           <li>
//             Your Rating Here: 8.7/10
//           </li>
//         </ul>
//       )
//     })}
//   </div>
// )
// }