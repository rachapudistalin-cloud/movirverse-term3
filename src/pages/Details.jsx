import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { getMovieVideos } from '../services/api'

const API_KEY = "5e590ecdb5b79f39ae8a58a45d6addc0"

const Details = () => {

    const { id } = useParams()
    const [trailer, setTrailer] = useState(null)
    const [movie, setMovie] = useState(null)

    useEffect(() => {

        const getMovie = async () => {

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            )

            setMovie(response.data)
            const videos = await getMovieVideos(id)

const officialTrailer = videos.find(
  (video) =>
    (video.type === 'Trailer' || video.type === 'Teaser') &&
video.site === 'YouTube'
)

if (officialTrailer) {
  setTrailer(officialTrailer.key)
}
console.log(videos)
console.log(officialTrailer)
        }

        getMovie()

    }, [id])

    if(!movie){
        return <h1>Loading...</h1>
    }

    return (
        <div className="details-page">

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <h1>{movie.title}</h1>

            <p>{movie.overview}</p>

            <h2>⭐ {movie.vote_average}</h2>

            <h3>Release Date: {movie.release_date}</h3>
                {trailer && (
  <a
    href={`https://www.youtube.com/watch?v=${trailer}`}
    target="_blank"
    rel="noreferrer"
  >
    <button className="trailer-btn">
      ▶ Watch Official Trailer
    </button>
  </a>
)}
        </div>
    )
}

export default Details