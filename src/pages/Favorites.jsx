import { useContext } from "react"
import { WatchlistContext } from "../context/WatchlistContext"

const Favorites = () => {
  const { watchlist, removeFromWatchlist } =
    useContext(WatchlistContext)

  return (
    <div>
      <h1>Favorite Movies</h1>

      {watchlist.length === 0 && (
        <h2>No Favorite Movies Added Yet</h2>
      )}

      <div className="movie-grid">
        {watchlist.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <p>⭐ {movie.vote_average}</p>

            <button
              onClick={() =>
                removeFromWatchlist(movie.id)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites