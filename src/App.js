import React, {useState, useEffect} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import restaurantData from "./data/restaurants.json";

import Header from './components/Header';
import Navbar from './components/Navbar';

function Map() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
  <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 48.137154, lng: 11.576124 }}
        >

        {restaurantData.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={{
              lat: restaurant.coordinates[0],
              lng: restaurant.coordinates[1]
            }}
            onClick={() => {
              setSelectedRestaurant(restaurant);
            }}
            icon={{
              url: "/glutenfree.svg",
              scaledSize: new window.google.maps.Size(25, 25)
            }}
        />
        ))}

          {selectedRestaurant ? (<InfoWindow
              position={{
                lat: selectedRestaurant.coordinates[0],
                lng: selectedRestaurant.coordinates[1]
              }}
              onCloseClick={() => {
                setSelectedRestaurant(null);
              }}
              >
                <div>
                  <h2>{selectedRestaurant.name}</h2>
                  <p>{selectedRestaurant.website}</p>
                </div>
              </InfoWindow>
            ) : null}
    </GoogleMap>
  )
}





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
      <Navbar/>
    </div>
  )
}
