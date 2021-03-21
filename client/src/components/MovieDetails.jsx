import React from "react";
import { useHistory } from "react-router-dom";

import './MovieDetails.scss'

export default function MovieDetails(props) {
  let history = useHistory();

  function showMovie(id) {
    history.push(`/movie/${id}`);
  }

  return (
    <article className="Movie">
      <div>
        <img
          onClick={() => showMovie(props.imdbID)}
          className="Movie__thumbnail"
          src={props.Poster}
          alt="Movie"
        />
        <div className="Movie__name">{props.Title}</div>
        <div className="Movie__year">{props.Year}</div>
      </div>
    </article>
  );
}
