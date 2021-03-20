import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const useMovieList = () => {
  const [
    {
      nowPlaying,
      upcomingMovies,
      popularMovies,
      topRatedMovies, 
    },
    setMovies
  ] = useState({
    nowPlaying: [],
    upcomingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
  }); 
  const getUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  const getNowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  const getPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  const getTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  const posterUrl = 'https://image.tmdb.org/t/p/original/';
  
  const movieResultsMapping = (movieData) => {
    const data = movieData.map((m) => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      title: m['title'],
    }))
    return data;
  }
  
  useEffect(() => {
    Promise.all([
      axios.get(getNowPlayingMovies),
      axios.get(getUpcomingMovies),
      axios.get(getPopularMovies),
      axios.get(getTopRatedMovies),
    ]).then((responses) => {
      const nowPlaying = movieResultsMapping(responses[0].data.results)
      const upcomingMovies = movieResultsMapping(responses[1].data.results)
      const popularMovies = movieResultsMapping(responses[2].data.results)
      const topRatedMovies = movieResultsMapping(responses[3].data.results)
      setMovies({
        nowPlaying,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
      })
    })
  }, [])

  // responses => {
  //   const [nowPlaying, upcomingMovie, popularMovies, topRatedMovies] = responses.map((response) => movieResultsMapping(response))
  //   setMovies({
  //     nowPlaying,
  //     upcomingMovie,
  //     popularMovies,
  //     topRatedMovies,
  //   })
  // }

  // responses => {
  //   const [nowPlayingResponse, ...otherResponses]
  //   const nowPlaying = doSomething(nowPlayingResponse)
  //   const [upcomingMovie,popularMovies, topRatedMovies] = otherResponses.map((resp) => movieResultsMapping(resp))
  // }

  return {
    nowPlaying,
    upcomingMovies,
    popularMovies,
    topRatedMovies, 
  }
}
export default useMovieList;

//