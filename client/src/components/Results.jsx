import React from "react";

import MovieDetails from "./MovieDetails";

export default function Results(props) {
  const { results } = props;

  const moviesWithPosters = results.filter((movie) => movie.Poster !== "N/A");

  return moviesWithPosters.map((movie) => {
    return <MovieDetails key={movie.imdbID} {...movie} />;
  });
}
