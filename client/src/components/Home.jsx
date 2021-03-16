import useMovieList from "../hooks/useMovieList";
import MovieSearch from "./MovieSearch";
import MovieCarousel from "./MovieCarousel";

const Home = () => {
  const {
    nowPlaying,
    upcomingMovies,
    popularMovies,
    topRatedMovies, 
  } = useMovieList()
  return(
    <>
      <MovieSearch />
      <MovieCarousel movies={nowPlaying} header="Now Playing:" />
      <MovieCarousel movies={topRatedMovies} header="Top Rated Movies:"/>
      <MovieCarousel movies={popularMovies} header="Popular Movies:"/>
      <MovieCarousel movies={upcomingMovies} header="Upcoming Movies:"/>
   
    </>
  )
}
export default Home 