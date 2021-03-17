import React, {useState, useEffect} from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import restaurantData from "../data/restaurants.json";



export default function Map() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
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

  <div style={{}}>
  <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
              process.env.REACT_APP_GOOGLE__MAPS_API_KEY
            }`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
</div>