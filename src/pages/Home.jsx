import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import Spinner from "../components/Spinner"

const API_KEY = "5e590ecdb5b79f39ae8a58a45d6addc0"

const Home = () => {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const [category, setCategory] = useState("popular")

  useEffect(() => {
    fetchMovies(category)
  }, [category])

  // CATEGORY MOVIES
  const fetchMovies = async (type) => {

    setLoading(true)

    try {

      let allMovies = []

      for(let page = 1; page <= 3; page++){

        let url = ""

        if(type === "popular"){
          url =
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        }

        else if(type === "top_rated"){
          url =
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
        }

        else if(type === "upcoming"){
          url =
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
        }

        else if(type === "trending"){
          url =
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
        }

        const response = await fetch(url)

        const data = await response.json()

        allMovies = [...allMovies, ...data.results]
      }

      setMovies(allMovies)

    } catch(error){
      console.log(error)
    }

    setLoading(false)
  }

  // GENRE MOVIES
  const fetchGenreMovies = async (genreId) => {

    setLoading(true)

    try{

      let allMovies = []

      for(let page = 1; page <= 3; page++){

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
        )

        const data = await response.json()

        allMovies = [...allMovies, ...data.results]
      }

      setMovies(allMovies)

    } catch(error){
      console.log(error)
    }

    setLoading(false)
  }

  // SEARCH MOVIES
  const handleSearch = async (value) => {

    setSearch(value)

    if(!value.trim()){
      fetchMovies(category)
      return
    }

    setLoading(true)

    try{

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
      )

      const data = await response.json()

      setMovies(data.results)

    } catch(error){
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="home">

      <h1 className="movies-title">
        HOME
      </h1>

      <input
        type="text"

        className="search-bar"
        placeholder ="Search Movies..."
        value={search}
        onChange={(e) =>
          handleSearch(e.target.value)
        }
      />

      <div className="category-buttons">

  <button
    className={category === "popular" ? "active-btn" : ""}
    onClick={() => {
      setCategory("popular")
      fetchMovies("popular")
    }}
  >
    Popular
  </button>

  <button
    className={category === "top_rated" ? "active-btn" : ""}
    onClick={() => {
      setCategory("top_rated")
      fetchMovies("top_rated")
    }}
  >
    Top Rated
  </button>

  <button
    className={category === "upcoming" ? "active-btn" : ""}
    onClick={() => {
      setCategory("upcoming")
      fetchMovies("upcoming")
    }}
  >
    Upcoming
  </button>

  <button
    className={category === "trending" ? "active-btn" : ""}
    onClick={() => {
      setCategory("trending")
      fetchMovies("trending")
    }}
  >
    Trending
  </button>

  <button
    className={category === "action" ? "active-btn" : ""}
    onClick={() => {
      setCategory("action")
      fetchGenreMovies(28)
    }}
  >
    Action
  </button>

  <button
    className={category === "comedy" ? "active-btn" : ""}
    onClick={() => {
      setCategory("comedy")
      fetchGenreMovies(35)
    }}
  >
    Comedy
  </button>

  <button
    className={category === "horror" ? "active-btn" : ""}
    onClick={() => {
      setCategory("horror")
      fetchGenreMovies(27)
    }}
  >
    Horror
  </button>

  <button
    className={category === "romance" ? "active-btn" : ""}
    onClick={() => {
      setCategory("romance")
      fetchGenreMovies(10749)
    }}
  >
    Romance
  </button>

  <button
    className={category === "animation" ? "active-btn" : ""}
    onClick={() => {
      setCategory("animation")
      fetchGenreMovies(16)
    }}
  >
    Animation
  </button>

</div>

      {loading ? (
        <Spinner />
      ) : (
        <div className={search ? "search-grid" : "movies-grid"}>

          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
            />
          ))}

        </div>
      )}
    </div>
  )
}

export default Home