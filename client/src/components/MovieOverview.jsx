import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MovieOverview(props) {
  const [data, setData] = useState([]);

  let urlId = window.location.pathname;
  let onlyId = urlId.substring(7);

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?i=${onlyId}&apikey=4a3b711b`;
    axios.get(apiUrl).then((response) => {
      console.log("here", response.data);
      setData(response.data);
    });
  }, []);

  const loopOverRatings = (array) => {
    const allRatings = array.map((array) => {
      return (
        <p>
          {array.Source} {array.Value}
        </p>
      );
    });
    return allRatings;
  };

  return Object.keys(data).length > 0 ? (
    <article className="container">
      <section>
        <h2>
          {data.Title} ({data.Year})
        </h2>
        <img src={data.Poster} alt="movie poster"></img>
      </section>
      <section className="movie-plot">
        <p>{data.Plot}</p>
      </section>
      <section className="movie-details">
        <h3>Movie Details</h3>
        <div>
          <p>Genres: {data.Genre}</p>
          {loopOverRatings(data.Ratings)}
        </div>
      </section>
      <section className="additional-data">
        <p>Production: {data.Production}</p>
        <p>BoxOffice: {data.BoxOffice}</p>
        <p>{data.Awards}</p>
      </section>
      <section>
        <h3>Cast & Crew</h3>
        <p>Director: {data.Director}</p>
        <p>Relevant Actors: {data.Actors}</p>
      </section>
    </article>
  ) : (
    <h2>Loading</h2>
  );
}
