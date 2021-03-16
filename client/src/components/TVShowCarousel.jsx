import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import { useHistory } from "react-router";

export default function TVShowCarousel(props) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  let history = useHistory();

  const getShowDetails = (tvShowID, history) => {
    let url = `https://api.themoviedb.org/3/tv/${tvShowID}/external_ids?api_key=b982a0ac1f7e5b7165da37d7d73cfb13&language=en-US`

    axios.get(url).then((response) => {
      const imdbID = response.data.imdb_id
      history.push(`/movie/${imdbID}`);
    })
  }


  return (
    <div >
      <h1>{props.header}</h1>
      <Carousel responsive={responsive} indicators="true" controls="false" draggable={false}
        infinite={true}
      >
        {props.shows
          .filter(({ backPoster }) =>
            backPoster !== 'https://image.tmdb.org/t/p/original/null')
          .map((show, index) =>
            <div key={index}>
              <img src={show.backPoster} alt="alt" onClick={() => getShowDetails(show.id, history)} ></img>
              {show.name}
            </div>
          )}

      </Carousel>
    </div>
  )
}

