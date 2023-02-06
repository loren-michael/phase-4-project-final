import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MoviesContainer from './components/MoviesContainer';
import MovieDetails from './components/MovieDetails';
import StoresContainer from './components/StoresContainer';
import Store from './components/Store';
import RentalForm from './components/RentalForm';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rentalMovie, setRentalMovie] = useState({});
  const [availableMovies, setAvailableMovies] = useState([]);
  const [activeRentals, setActiveRentals] = useState([])

  useEffect(()=>{
    fetch('/me').then(r => {
      if (r.ok) {
        r.json().then(user => setUser(user))
      }
    })
    .then(fetchMovies())
  }, [])

  function fetchMovies() {
    fetch('/movies')
    .then(r => r.json())
    .then(movies => setMovies(movies))
  }

  // function handleActiveRentalSetup() {
  //   // const userRentalsArray = user.rentals.map(rental => {
  //   //   return rental.movie_id
  //   // })
  //   // console.log("array", userRentalsArray)
  //   console.log(user)
  // }

  // function userSetup(user) {
  //   setUser(user);
  //   const userRentals = []
  //   if (user.rentals.length > 0) {
  //     user.rentals.forEach(rental => {
  //       userRentals.push(rental.movie_id)
  //     })
  //   }
  //   const userRentedMovies = [];
  //   userRentals.forEach(id => {
  //     movies.map(movie => {
  //       if (movie.id === id) {
  //         userRentedMovies.push(movie)
  //       }
  //     })
  //   })
  //   setActiveRentals(userRentedMovies)
  // }

  // useEffect(() => {
  //   const userRentals = [user.rentals]
  //   userRentals.forEach(rental => {
  //     console.log(rental.movie_id)
  //   });
  // }, [user, movies])

  // useEffect(() => {
  //   console.log(movies)
  //   const userRentals = user.rentals
  //   console.log(userRentals)
  //   const [userActiveRentals] = userRentals.map(rental => {
  //     return movies.map(movie => {
  //       if (movie.id === rental.movie_id) {
  //         return movie
  //       }
  //     })
  //   })
  //   console.log(userActiveRentals)
  // }, [user])


  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser} setRentalMovie={setRentalMovie} movies={movies} />
        <Switch>
          <Route exact path="/movies">
            <MoviesContainer 
              fetchMovies={fetchMovies} 
              user={user} 
              movies={movies} 
              availableMovies={availableMovies}
            />
          </Route>
          <Route path={"/movies/:id"}>
            <MovieDetails 
              movies={movies} 
              setRentalMovie={setRentalMovie} 
            />
          </Route>
          <Route path="/stores">
            <StoresContainer 
              user={user} 
              stores={stores} 
              setStores={setStores}
            />
          </Route>
          <Route path="/stores/:id">
            <Store />
          </Route>
          <Route path="/rent">
            <RentalForm 
              user={user} 
              movies={movies} 
              setMovies={setMovies} 
              availableMovies={availableMovies} 
              rentalMovie={rentalMovie} 
              setRentalMovie={setRentalMovie} 
              activeRentals={activeRentals}
              setActiveRentals={setActiveRentals}
              fetchMovies={fetchMovies}
            />
          </Route>
          <Route exact path="/">
            <Home 
              user={user} 
              setUser={setUser} 
              movies={movies} 
              fetchMovies={fetchMovies}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
