import useMovieList from "../hooks/useMovieList";
import useTVShowList from "../hooks/useTVShowList";
import MovieSearch from "./MovieSearch";
import MovieCarousel from "./MovieCarousel";
import TVShowCarousel from "./TVShowCarousel";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

const Home = () => {
  const {
    nowPlaying,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
  } = useMovieList();

  const { showsAiringToday, popularShows, topRatedShows } = useTVShowList();

  return (
    <>
      <MovieSearch />
      <MovieCarousel movies={nowPlaying} header="Now Playing:" />
      <MovieCarousel movies={topRatedMovies} header="Top Rated Movies:" />
      <MovieCarousel movies={popularMovies} header="Popular Movies:" />
      <MovieCarousel movies={upcomingMovies} header="Upcoming Movies:" />
      <TVShowCarousel shows={showsAiringToday} header="TV Shows Airing Today:" />
      <TVShowCarousel shows={popularShows} header="Popular TV Shows:" />
      <TVShowCarousel shows={topRatedShows} header="Top Rated TV Shows:" />
      <ScrollToTop />
      <Footer/>
    </>
  );
};
export default Home;
