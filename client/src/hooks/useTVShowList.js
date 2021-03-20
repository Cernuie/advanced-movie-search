import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_TMDB_KEY;

const useTVShowList = () => {
  const [
    {
      showsAiringToday,
      popularShows,
      topRatedShows,
    },
    setShows
  ] = useState({
    showsAiringToday: [],
    popularShows: [],
    topRatedShows: [],
  });
  const getShowsAiringToday = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  const getPopularShows = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  const getTopRatedShows = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  const posterUrl = 'https://image.tmdb.org/t/p/original/'

  const tvShowResultsMapping = (showData) => {
    const data = showData.map((s) => ({
      id: s['id'],
      backPoster: posterUrl + s['backdrop_path'],
      posterPath: posterUrl + s['poster_path'],
      name: s['name'],
    }))
    return data;
  }

  useEffect(() => {
    Promise.all([
      axios.get(getShowsAiringToday),
      axios.get(getPopularShows),
      axios.get(getTopRatedShows),
    ]).then((responses) => {
      const showsAiringToday = tvShowResultsMapping(responses[0].data.results)
      const popularShows = tvShowResultsMapping(responses[1].data.results)
      const topRatedShows = tvShowResultsMapping(responses[2].data.results)
      setShows({
        showsAiringToday,
        popularShows,
        topRatedShows,
      })
    })
  }, [])

  return {
    showsAiringToday,
    popularShows,
    topRatedShows,
  }
}
export default useTVShowList;

//