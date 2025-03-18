import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";
import "./MoviesList.css";
import Header from "./Header";

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortRating, setSortRating] = useState("desc");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = (query) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (order === "desc") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else {
        return new Date(a.release_date) - new Date(b.release_date);
      }
    });
    setFilteredMovies(sortedMovies);
  };

  const handleSortRating = (order) => {
    setSortRating(order);
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (order === "desc") {
        return b.vote_average - a.vote_average;
      } else {
        return a.vote_average - b.vote_average;
      }
    });
    setFilteredMovies(sortedMovies);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header onSearch={handleSearch} onSort={handleSort} onSortRating={handleSortRating} />
      <div className="movies-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <div className="movie-info">
                <p>⭐ {movie.vote_average}</p>
                <p>📅 {new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
