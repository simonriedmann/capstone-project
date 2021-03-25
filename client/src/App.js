import React from 'react';

import {
  Switch, Route
} from "react-router-dom";

import Navigation from './components/Navigation';
import Header from './components/Header'

import Map from './pages/Map';
import Home from './pages/Home';
import FavoriteRestaurants from './pages/FavoriteRestaurants'





export default function App() {
  



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




