import React from "react";

export default function Movie(props) {

  return (
    <article className="Movie">
      <img className="Movie__thumbnail" src={props.Poster} alt="Movie" />
      <div >
        <div className="Movie__name">{props.Title}</div>
        <div className="Movie__year">{props.Year}</div>
      </div>
    </article>
  );
}