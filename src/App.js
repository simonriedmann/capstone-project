import React, {useState, useEffect} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import restaurantData from "./data/restaurants.json";

import Header from './components/Header';
import Map from './components/Map';


const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div>
      <Header/>

      <div style={{width: '100vw', height: '70vh'}}>
        <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY
                  }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>

    </div>
  )
}
