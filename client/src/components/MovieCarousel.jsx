import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const axios = require('axios');

export default function MovieCarousel(props) {
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

  console.log(props.movies)

  return (
    <div >
    <Carousel responsive={responsive} indicators="true" controls="false" draggable={false}
       infinite={true}
    >
      {props.movies.map((movie) =>
        <ul>
          <li>
            <img src={movie.backPoster} alt="alt"></img>
          </li>
          <li>
            <h1>{movie.title}</h1>
          </li>
        </ul>
      )}
    </Carousel>
    </div>
  )
}

