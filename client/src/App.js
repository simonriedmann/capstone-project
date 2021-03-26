import React, { useEffect } from 'react';

import {
  Switch, Route
} from "react-router-dom";
import { useLocalStorage } from './hooks/useLocalStorage';

import Navigation from './components/Navigation';
import Header from './components/Header'

import Map from './pages/Map';
import Home from './pages/Home';
import FavoriteRestaurants from './pages/FavoriteRestaurants'





export default function App() {
  /*const apiServerURL = '/api';

  const [restaurants, setRestaurants] = useLocalStorage('Restaurants', [])


  
  useEffect(() => {
    fetch(apiServerURL + '/restaurants')
      .then((result) => result.json())
      .then((restaurants) => setRestaurants(restaurants))
      .catch((error) => console.error(error.message));
  }, []);
  */
  



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
        
        />
      </Route>
      <Route path="/favoriterestaurants">
        <FavoriteRestaurants 
        />
      </ Route>
    </Switch>
  </>



  );
}




