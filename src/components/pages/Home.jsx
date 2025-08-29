import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../Search.jsx";
import Spinner from "../Spinner.jsx";
import MovieCard from "../MovieCard.jsx";
import MovieModal from "../MovieModel.jsx";
import { getTrendingMovies, updateSearchCount } from "../../appwrite/appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Modal state
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?&query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?include_adult=true&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        setMovieList(json.results);
      } else {
        setErrorMessage("No movies found");
        setMovieList([]);
      }
      if (query && json.results && json.results.length > 0) {
        await updateSearchCount(query, json.results[0]);
      }
    } catch (e) {
      console.error("Error fetching movies:", e);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (e) {
      console.error("Error fetching trending movies:", e);
    }
  };

  const openMovieModal = async (idOrTitle) => {
    if (typeof idOrTitle === "number") {
        setSelectedMovieId(idOrTitle);
        setIsModalOpen(true);
    } else {
        try {
        const response = await fetch(
            `${API_BASE_URL}/search/movie?query=${encodeURIComponent(idOrTitle)}`,
            API_OPTIONS
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            setSelectedMovieId(data.results[0].id); // use TMDB ID from search
            setIsModalOpen(true);
        }
        } catch (err) {
            console.error("Error searching movie:", err);
        }
    }
};

  return (
    <>
      <section className="hero pt-24">
        <img src="/hero.png" alt="hero" />
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy
          without the hassle
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {trendingMovies.map((movie, index) => (
              <li
                key={movie.$id}
                className="cursor-pointer"
                onClick={() => openMovieModal(movie.movie_id)} // ✅ use movie_id from DB
              >
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.search} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="all-movies">
        <h2>All Movies</h2>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => openMovieModal(movie.id)}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </ul>
        )}
      </section>

      {/* Movie Modal */}
      <MovieModal
        movieId={selectedMovieId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Home;
