import React from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="modal-body">
          <div className="modal-left">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="modal-poster"
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>⭐ {movie.vote_average}</p>
            <p>📅 {new Date(movie.release_date).toLocaleDateString()}</p>
          </div>
          <div className="modal-right">
            {movie.trailerKey ? (
              <iframe
                className="modal-trailer"
                src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Trailer not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
