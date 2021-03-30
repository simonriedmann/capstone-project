import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';

import Navigation from './components/Navigation';
import Header from './components/Header'

import Home from './pages/Home';
import Map from './pages/Map';
import FavoriteRestaurants from './pages/FavoriteRestaurants'





export default function App() {
  const apiServerURL = '/api';

  const [restaurants, setRestaurants] = useLocalStorage('Restaurants', []);

  const [favoriteRestaurants, setFavoriteRestaurants] = useLocalStorage('FavoriteRestaurants', []);


  useEffect(() => {
    fetch(apiServerURL + '/restaurants')
      .then((result) => result.json())
      .then((restaurants) => setRestaurants(restaurants))
      .catch((error) => console.error(error.message));
  }, []);

  const updateFavorites = (restaurants) => setFavoriteRestaurants([...restaurants]);

  const addFavoriteRestaurant = (restaurant) => {
    if (
      favoriteRestaurants.some(
        (favoriteRestaurant) => restaurant._id === favoriteRestaurant._id
      )
    ) {
      setFavoriteRestaurants(
        favoriteRestaurants.filter(
          (favoriteRestaurant) => favoriteRestaurant._id !== restaurant._id
      )
      );
    } else {
      setFavoriteRestaurants([...favoriteRestaurants, restaurant])
    }
  };




  

  return (
    <>
    <Header />
    <Navigation />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>  
      <Route path="/map">
        <Map 
          restaurantData={restaurants}
          favoriteRestaurants={favoriteRestaurants}
          addFavoriteRestaurant={addFavoriteRestaurant}
        />
      </Route>
      <Route path="/favoriterestaurants">
        <FavoriteRestaurants
          favoriteRestaurants={favoriteRestaurants}
          updateFavorites={updateFavorites}  
        />
      </ Route>
    </Switch>
  </>
  );
}




