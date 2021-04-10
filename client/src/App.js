import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

import Navigation from './components/Navigation';
import Header from './components/Header'

import AddRestaurant from './pages/AddRestaurant';
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

  const addRestaurantToDatabase = async (newRestaurant) => {
    const response = await fetch(apiServerURL + '/restaurants', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurant),
    });
    return response.json();
  };

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, { ...restaurant, _id: uuidv4() }]);
    addRestaurantToDatabase(restaurant);
  };


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
      <Route path="/addrestaurant">
        <AddRestaurant 
          addRestaurant={addRestaurant}
        />
      </Route>  
    </Switch>
  </>
  );
}




