import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { WatchlistContext } from '../context/WatchlistContext'

const MovieCard = ({ movie }) => {
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist
  } = useContext(WatchlistContext)

  const isFavorite = watchlist.some(
    (item) => item.id === movie.id
  )

  return (
    <div className='movie-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>
      <p className='rating'>
⭐ {movie.vote_average?.toFixed(1)}
</p>

      {isFavorite ? (
        
        <button className="favorite-btn" onClick={() => removeFromWatchlist(movie.id)}>
          Remove Favorite
        </button>
      ) : (
        <button className="favorite-btn" onClick={() => addToWatchlist(movie)}>
          Add to Favorites
        </button>
      )}

      <Link to={`/movie/${movie.id}`}>
  <button>View Details</button>
</Link>

    </div>
  )
}

export default MovieCard