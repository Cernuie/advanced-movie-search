import React from "react";

import MovieDetails from "./MovieDetails";

export default function Results(props) {
  const { results } = props;

  // console.log("results here", results);

  const moviesWithPosters = results.filter((movie) => movie.Poster !== "N/A");
  
  return moviesWithPosters.map((movie) => {
    // return <h1>{movie.Title}</h1>

    return <MovieDetails key={movie.imdbID} {...movie} />;
  });
}
