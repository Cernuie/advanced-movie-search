import React from "react";

import MovieDetails from "./MovieDetails";

export default function Results(props) {

  const { results } = props;

  return results.map(movie => {

    console.log(movie);
    
    return <MovieDetails key={movie.imdbID} {...movie} />
  })

}