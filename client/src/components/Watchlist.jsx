import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"

const API_KEY = process.env.REACT_APP_OMDB_KEY;

export default function Watchlist() {

  const [watchList, setWatchList] = useState([]);
  let history = useHistory()

  useEffect(() => {
    axios.get("/api/watchlist", {
      headers: { Authorization: localStorage.getItem("token")},
    })
    .then((response) => {
      const promises = [];
      for (let media of response.data.imdbID) {
        const imdbID = media.imdb_id;
        let mediaDetails = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;

        const mediaDetailsPromise = 
        axios.get(mediaDetails)
        .then((response) => {
          return response.data;
        });
        promises.push(mediaDetailsPromise);
      }
      return Promise.all(promises);
    })
    .then((mediaDetails) => {
      setWatchList(mediaDetails);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const removeMediaFromWatchListPage = (id, index, title) => {

    axios.delete(`/api/watchlist/new?movieID=${id}`, {
      headers: {"Authorization": localStorage.getItem("token")},
    }).then((response) => {
      console.log("delete passed", response)
      console.log("deletion on watchlist", response.data.deletion)
      if (response.data.deletion === "true") {
        const currentWatchList = [...watchList]
        currentWatchList.splice(index, 1);
        setWatchList(currentWatchList)
        alert(`You have deleted ${title} from your watch list!`)
      }
    })
  }

  return (
    <div className="flex-wrap">
      {watchList.map((movie, index) => {
        return (
          <ul key={movie.imdbID}>
            <div><img onClick={() => history.push(`/movie/${movie.imdbID}`)}src={movie.Poster} width="200px" height="300px"/></div>
            <li>Title: {movie.Title}</li>
            <li>
              Release Year: {movie.Year}
            </li>
            {movie.Type === "series" && <li> Type: TV Series </li>}
            {movie.Type === "movie" && <li> Type: Movie </li>}
            <button type="button" onClick={() => removeMediaFromWatchListPage(movie.imdbID, index, movie.Title)}>
              {" "}
              Remove from WatchList{" "}
            </button>
          </ul>
        );
      })}
    </div>
  );
}

//