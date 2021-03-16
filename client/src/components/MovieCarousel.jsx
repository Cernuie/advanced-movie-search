import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  return (
    <div >
      <h1>{props.header}</h1>
      <Carousel responsive={responsive} indicators="true" controls="false" draggable={false}
        infinite={true}
      >
        {props.movies.map((movie) =>
          <ul>
            <img src={movie.backPoster} alt="alt"></img>
            {movie.title}
          </ul>
        )}
      </Carousel>
    </div>
  )
}

