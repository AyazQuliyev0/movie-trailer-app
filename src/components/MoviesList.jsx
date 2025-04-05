import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import "./MoviesList.css";
import Header from "./Header";
import MovieModal from "./MovieModal";
import axios from "axios";

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.favorites.favorites);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortRating, setSortRating] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch])

  useEffect(() => {
    let updatedMovies = showFavorites ? [...favorites] : [...movies];
    if (searchQuery) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    updatedMovies = updatedMovies.sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.release_date) - new Date(a.release_date)
        : new Date(a.release_date) - new Date(b.release_date)
    );

    updatedMovies = updatedMovies.sort((a, b) =>
      sortRating === "desc" ? b.vote_average - a.vote_average : a.vote_average - b.vote_average
    );
    setFilteredMovies(updatedMovies);
  }, [movies, favorites, searchQuery, sortOrder, sortRating, showFavorites]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleSortRating = (order) => {
    setSortRating(order);
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          params: {
            api_key: "8210bf58af0326bff3d6ef3d33c2c864",
            language: "en-US",
          },
        }
      );
      console.log("Videos response:", response.data.results);
      const trailer = response.data.results.find((video) => 
        video.type === "Trailer" || video.type === "Teaser"
      );
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  const handleMovieClick = async (movie) => {
    const trailerKey = await fetchTrailer(movie.id);
    setSelectedMovie({ ...movie, trailerKey });
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header onSearch={handleSearch} onSort={handleSort} onSortRating={handleSortRating} />
      <button className="toggle-favorites" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Movies" : "Show Favorites"}
      </button>
      <div className="movies-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <div className="movie-info">
                <p>⭐ {movie.vote_average}</p>
                <p>📅 {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}</p>
              </div>
              <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}>
                {favorites.some((fav) => fav.id === movie.id) ? "★" : "☆"}
              </button>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default MoviesList;
