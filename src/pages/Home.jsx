import { useEffect, useState } from "react"
import { getPopularMovies, searchMovies } from "../services/api"
import MovieCard from "../components/MovieCard"
import Spinner from "../components/Spinner"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPopularMovies()
  }, [])

  const loadPopularMovies = async () => {
    setLoading(true)

    try {
      const data = await getPopularMovies()
      setMovies(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!search.trim()) {
      loadPopularMovies()
      return
    }

    setLoading(true)

    try {
      const data = await searchMovies(search)
      setMovies(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <div className="home">
      <h1 className="movies-title">Popular Movies</h1>

      <form>
        <input
  type="text"
  className="search-bar"
  placeholder="Search Movies..."
  value={search}
  onChange={async (e) => {
    const value = e.target.value
    setSearch(value)

    if (!value.trim()) {
      loadPopularMovies()
      return
    }

    setLoading(true)

    try {
      const data = await searchMovies(value)
      setMovies(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }}
/>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home