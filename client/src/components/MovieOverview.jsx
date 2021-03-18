import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import StreamablePlayer from "./StreamablePlayer";
import { useLocation } from "react-router";

export default function MovieOverview(props) {
  const [data, setData] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    const onlyId = location.pathname.substring(7);
    const apiUrl = `https://www.omdbapi.com/?i=${onlyId}&apikey=4a3b711b`;
    axios.get(apiUrl).then((response) => {
      setData(response.data);
    });
  }, [location.pathname]);

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

  const reactStarsFormat = {
    size: 40,
    count: 10,
    isHalf: false,
    value: 4,
    color: "blue",
    activeColor: "yellow",
    onChange: (newValue) => {
      console.log(`New user rating is: ${newValue}`);
    },
  };

  const convertDataToFavorites = (parsedData) => {

    axios.post("/api/users/favorites/new", {
      headers: { "Authorization": localStorage.getItem("token") },
      movie: parsedData
    }).then((response) =>{
      console.log(response)
    })
}

  

  return Object.keys(data).length > 0 ? (
    <article className="container">
      <section>
        <h2>{data.Title}</h2>
        <button type="button" onClick={() => convertDataToFavorites(data)}> Add to Favorites </button>
        <button type="button"> Add to Watch List </button>
        <div id="page">
          <div id="divTable" class="InsideContent">
            <table id="logtable">
              <img
                className="poster"
                src={data.Poster}
                alt="movie poster"
              ></img>
            </table>
          </div>

          <div id="divMessage" class="InsideContent">
            <StreamablePlayer />
          </div>
        </div>
      </section>

      <div>
        <h3> Plot Overview: </h3>
        <p>{data.Plot}</p>

        {data.Type === "movie" && <h3>Movie Details:</h3>}
        {data.Type === "series" && <h3>TV Show Details:</h3>}
        <div>
          <p>Genres: {data.Genre}</p>
          {loopOverRatings(data.Ratings)}
        </div>

        <p>Year Released: {data.Year} </p>
        <p>Production: {data.Production}</p>
        <p>BoxOffice: {data.BoxOffice}</p>

        {data.Awards !== "N/A" && <p>{data.Awards}</p>}

        <h3>Cast & Crew:</h3>
        <p>Director: {data.Director}</p>
        <p>Relevant Actors: {data.Actors}</p>

        <h3>
          Leave a Rating Below:
          <ReactStars {...reactStarsFormat} />
        </h3>
      </div>
    </article>
  ) : (
    <h2>Loading</h2>
  );
}
