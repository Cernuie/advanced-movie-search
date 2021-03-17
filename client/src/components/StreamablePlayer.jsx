import React, { useState, useEffect } from "react"
import ReactPlayer from "react-player"

import { useLocation } from "react-router-dom";
import axios from "axios";

export default function StreamablePlayer() {

  const location = useLocation();

  const [video, setVideo] = useState({});

  useEffect(() => {
    const imdbID = location.pathname.substring(7);
    const url = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=b982a0ac1f7e5b7165da37d7d73cfb13&language=en-US`

    axios.get(url)
      .then(response => response.data.id)
      .then((id) => {
        const urlVideoFetch = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b982a0ac1f7e5b7165da37d7d73cfb13&language=en-US`

        axios.get(urlVideoFetch).then(response => {
          // console.log(response.data.results)
          setVideo(response.data.results[0])
        })
      })
  }, [location.pathname])

  const youtubeUrl = "https://www.youtube.com/watch?v=";
  const isThereAVideo = youtubeUrl + video.key
  
  return (
    <div className='player-wrapper'>
      {isThereAVideo !== "https://www.youtube.com/watch?v=undefined" &&
        <ReactPlayer
          className='react-player'
          url={youtubeUrl + video.key}
          width='100%'
          height='100%'
          controls
      />}
    </div>
  )
}
