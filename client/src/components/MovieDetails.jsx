import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function MovieDetails(props) {
  const [view, setView] = useState("start");

  const triggerMovieOverview = () => {
    setView("show");
  };

  const resetMovieList = () => {
    setView("start");
  };

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?i=${props.imdbID}&apikey=4a3b711b`;
    axios.get(apiUrl).then((response) => console.log("here", response.data));
  }, [view]);

  return (
    <article className="Movie">
      {view === "start" && (
        <div>
          <img
            onClick={triggerMovieOverview}
            className="Movie__thumbnail"
            src={props.Poster}
            alt="Movie"
          />
          <div className="Movie__name">{props.Title}</div>
          <div className="Movie__year">{props.Year}</div>
        </div>
      )}
      {view === "show" && (
        <div>
          <img
            onClick={(window.location.href = `movie/${props.imdbID}`)}
            className="Movie__thumbnail"
            src={props.Poster}
            alt="Movie"
          />

          <div className="Movie__year">{props.Year}</div>
        </div>
      )}
    </article>
  );
}
