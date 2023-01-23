import '../styles.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MovieDetails({ movies }) {
  const params = useParams();
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    const movieId = parseInt(params.id);
    if (movies.length > 0) {
      const foundMovie = movies.find(mov => mov.id === parseInt(params.id))
      setMovie(foundMovie)
    } else if (movies.length === 0) {
      fetch(`/movies/${movieId}`)
      .then(r => r.json())
      .then(movie => setMovie(movie))
    }
  },[])

  return (
    <div className="movie-details">
      <img 
        src={movie.poster_url} 
        alt={`${movie.title} Poster`}
        className="poster-details"
      />
      <h1 className="movie-title">{movie.title}</h1>
      <div className="movie-detail-bar">
        <div>{movie.mpaa}</div>
        <div>{movie.runtime} Minutes</div>
        <div>{movie.year}</div>
      </div>
      <br></br>
      <p className="synopsis">{movie.synopsis}</p>
      <br></br>
      {movie.availability ? <button>Rent this movie!</button> : <div>Sorry, this movie is not available to rent.</div> }
    </div>
  )
}

export default MovieDetails