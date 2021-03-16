import React, {useState, useEffect} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import restaurantData from "./data/restaurants.json";

import Header from './components/Header';


function Map() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  function restaurantIcon(type) {
    if (type === "Cafe") {

      return {
        url: "/cafe.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 
    
    else if (type === "Ice Cream") {

      return {
        url: "/icecream.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 

    else if (type === "Bakery") {

      return {
        url: "/bakery.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 

    else if (type === "Vegan") {

      return {
        url: "/vegan.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 

    else if (type === "Mexican") {

      return {
        url: "/mexican.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 

    else if (type === "Italian") {

      return {
        url: "/italian.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    } 

    else {
      return {
        url: "/glutenfree.svg",
        scaledSize: new window.google.maps.Size(25, 25)
      }
    }
  }

  return (
  <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 48.269789183437375, lng: 11.193012202583548 }}
        >

        {restaurantData.map(restaurant => (
          <Marker
            position={{
              lat: restaurant.coordinates[0],
              lng: restaurant.coordinates[1]
            }}
            onClick={() => {
              setSelectedRestaurant(restaurant);
            }}
            icon={restaurantIcon(restaurant.type)}
          
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
                  <p>Type: {selectedRestaurant.type}</p>
                  <p>Address: {selectedRestaurant.street}, {selectedRestaurant.postal_code} {selectedRestaurant.city}</p>
                  <p>Menu: {selectedRestaurant.website}</p>
                  <p>Phone: {selectedRestaurant.phone}</p>
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

    </div>
  )
}
