import '../styles.css'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MoviesContext } from '../context/movies';

function MovieDetails({ setRentalMovie, user }) {
  const history = useHistory();
  const params = useParams();
  const [movie, setMovie] = useState({});

  const [movies, setMovies] = useContext(MoviesContext);


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

  function handleRentalClick(movie) {
    setRentalMovie(movie)
    history.push("/rent")
  }

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
      <br></br>
      { user && movie.availability ? <button value={movie.id} onClick={() => handleRentalClick(movie)}>Rent this movie!</button> : <div>Sorry, this movie is not available to rent.</div> }
      
    </div>
  )
}

export default MovieDetails