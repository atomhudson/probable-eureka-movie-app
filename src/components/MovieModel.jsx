/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieModal = ({ movieId, isOpen, onClose }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/movie/${movieId}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <AnimatePresence>
      {isOpen && movie && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Content */}
          <motion.div
            className="bg-gray-900 text-white p-6 rounded-2xl max-w-3xl w-full shadow-lg relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            {/* Movie Poster & Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-64 mx-auto md:mx-0"
              />

              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="italic text-gray-400">{movie.tagline}</p>
                <p className="text-sm">{movie.overview}</p>

                <p>
                  <span className="font-semibold">Release:</span>{" "}
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold">Runtime:</span>{" "}
                  {movie.runtime} mins
                </p>
                <p>
                  <span className="font-semibold">Rating:</span>{" "}
                  ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </p>

                <div>
                  <span className="font-semibold">Genres:</span>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;
