import axios from "axios"

const API_KEY = "5e590ecdb5b79f39ae8a58a45d6addc0"

const BASE_URL = "https://api.themoviedb.org/3"

const options = {
  timeout: 10000,
}

// POPULAR MOVIES
export const getPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    options
  )

  return response.data.results.filter(
    (movie) =>
      !movie.adult &&
      movie.poster_path &&
      movie.vote_count > 200 &&
      movie.popularity > 20 &&
      movie.original_language === "en"
  )
}

// SEARCH MOVIES
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    options
  )

  return response.data.results.filter(
    (movie) =>
      !movie.adult &&
      movie.poster_path
  )
}

// MOVIE DETAILS
export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    options
  )

  return response.data
}

// MOVIE TRAILER
export const getMovieVideos = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
    options
  )

  return response.data.results
}