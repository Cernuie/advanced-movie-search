import React, { useEffect, useState, forceUpdate } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import StreamablePlayer from "./StreamablePlayer";
import { useLocation } from "react-router";

export default function MovieOverview(props) {
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState("");
  const [watchList, setWatchList] = useState("");
  const [reviews, setReviews] = useState("");
  const [stars, setStars] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

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
      console.log(newValue);
      setStars(newValue);
    },
  };

  const convertDataToReviews = () => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .post(`/api/reviews/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
        rating: stars,
        message: message,
      })
      .then((response) => {
        console.log(response);
        //change later to proper response
      });
  };

  const convertDataToFavorites = () => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .post(`/api/favorites/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        setIsFavorite("passed");
      });
  };

  useEffect(() => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .get(`/api/favorites/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("RESPONSE", response.data.pass);
        if (response.data.pass === "passed") {
          setIsFavorite(response.data.pass);
        } else {
          setIsFavorite("");
        }
      });
  }, []);

  const deleteFavorite = () => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .delete(`/api/favorites/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("delete passed", response);
        console.log("deletion is here", response.data.deletion);
        if (response.data.deletion === "true") {
          console.log("inside the if statement");
          setIsFavorite("");
        }
      });
  };

  const convertDataToWatchList = () => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .post(`/api/watchlist/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);
        setWatchList("passed");
      });
  };

  useEffect(() => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .get(`/api/watchlist/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("Reponse here", response.data.pass);
        if (response.data.pass === "passed") {
          setWatchList(response.data.pass);
        } else {
          setWatchList("");
        }
      });
  }, []);

  const deleteWatchList = () => {
    const movieID = document.location.pathname.split("/")[2];
    axios
      .delete(`/api/watchlist/new?movieID=${movieID}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("delete passed", response);
        console.log("deletion is here", response.data.deletion);
        if (response.data.deletion === "true") {
          console.log("inside the if statement");
          setWatchList("");
        }
      });
  };

  const validateReview = () => {
    if (!text) {
      setMessage("Review can not be blank");
      return;
    } else {
      setMessage(text);
      convertDataToReviews();
    }
  };

  useEffect(() => {
    const movieID = document.location.pathname.split("/")[2];
    axios.get(`/api/reviews/new?movieID=${movieID}`).then((response) => {
      if ((response.data.pass = "passed")) {
        setReviews(response.data.response);
      } else {
        setReviews("");
      }
    });
  }, []);

  const reactStarsFormat2 = {
    size: 40,
    count: 10,
    isHalf: false,
    value: 4,
    color: "blue",
    activeColor: "yellow",
  };

  return Object.keys(data).length > 0 ? (
    <article className="container">
      <section>
        <h2>{data.Title}</h2>

        {isFavorite !== "passed" ? (
          <button type="button" onClick={() => convertDataToFavorites()}>
            {" "}
            Add to Favorites{" "}
          </button>
        ) : (
          <button type="button" onClick={() => deleteFavorite()}>
            {" "}
            Remove from Favorites{" "}
          </button>
        )}

        {watchList !== "passed" ? (
          <button type="button" onClick={() => convertDataToWatchList()}>
            {" "}
            Add to Watch List{" "}
          </button>
        ) : (
          <button type="button" onClick={() => deleteWatchList()}>
            {" "}
            Remove from Watch List{" "}
          </button>
        )}

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
        <div className="comments">
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              type="text"
              placeholder="Write comments here"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" onClick={validateReview}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <section>
        <h4>User Comments</h4>
        {reviews &&
          reviews.map((review) => {
            return (
              <div>
                <h2>User ID: {review.user_id}</h2>
                <p>Review: {review.user_review}</p>
                <p>Movie Rating: {review.user_rating}/10</p>
                <ReactStars {...reactStarsFormat} value={review.user_rating} />
              </div>
            );
          })}
      </section>
    </article>
  ) : (
    <h2>Loading</h2>
  );
}

// const reactStarsFormat = {
//   size: 40,
//   count: 10,
//   isHalf: false,
//   value: 4,
//   color: "blue",
//   activeColor: "yellow",
//   onChange: (newValue) => {
//     console.log(newValue);
//     setStars(newValue);
//   },
// };
// ask mentor
{
  /* <ReactStars {...reactStarsFormat, {value: 5}} /> */
}
