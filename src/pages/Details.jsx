import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { getMovieVideos } from "../services/api"

const API_KEY = "5e590ecdb5b79f39ae8a58a45d6addc0"

const Details = () => {

  const { id } = useParams()

  const [movie, setMovie] = useState(null)

  const [cast, setCast] = useState([])

  const [trailer, setTrailer] = useState(null)

  useEffect(() => {

    const getMovie = async () => {

      try {

        // MOVIE DETAILS
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )

        setMovie(response.data)

        // CAST
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        )

        setCast(castResponse.data.cast.slice(0, 10))

        // TRAILER
        const videos = await getMovieVideos(id)

        const officialTrailer = videos.find(
          (video) =>
            (video.type === "Trailer" ||
             video.type === "Teaser") &&
            video.site === "YouTube"
        )

        if (officialTrailer) {
          setTrailer(officialTrailer.key)
        }

      } catch (error) {

        console.log(error)

      }
    }

    getMovie()

  }, [id])

  if (!movie) {

    return <h1>Loading...</h1>

  }

  return (

    <div className="details-wrapper">

      <div className="details-card">

        {/* LEFT SIDE POSTER */}

        <img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* RIGHT SIDE CONTENT */}

        <div className="details-content">

          <h1>{movie.title}</h1>

          <p className="details-overview">
            {movie.overview}
          </p>

          <div className="details-info">

            <h3>
               Rating: {movie.vote_average}
            </h3>

            <h3>
               Release Date: {movie.release_date}
            </h3>

            <h3>
               Runtime: {movie.runtime} mins
            </h3>

            <h3>
               Genres:
              {" "}
              {movie.genres
                .map((genre) => genre.name)
                .join(", ")}
            </h3>

          </div>

          {/* CAST */}

          <h2 className="cast-heading">
            Cast
          </h2>

          <div className="cast-container">

            {cast.map((actor) => (

              <div
                className="cast-card"
                key={actor.id}
              >

                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300"
                  }
                  alt={actor.name}
                />

                <p>{actor.name}</p>

              </div>

            ))}

          </div>

          {/* TRAILER BUTTON */}

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

      </div>

    </div>

  )
}

export default Details