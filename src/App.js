import React, {useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";






import Header from './components/Header';
import Navbar from './components/Navbar';
import Map from './pages/Map';
import Home from './pages/Home';
import FavoriteRestaurants from './pages/FavoriteRestaurants'




export default function App() {

  

  return (
    <div>
      <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/favoriterestaurants">
            <FavoriteRestaurants />
          </Route>
          <Route path="/">
            <Home />
          </Route>  
        </Switch>
      </div>
    </Router>

    </div>
  )
}




