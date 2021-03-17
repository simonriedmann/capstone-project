import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import restaurantData from "./data/restaurants.json";

const libraries = ["places"];
const mapContainerStyle = {
  height: "70vh",
  width: "100vw",
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};


export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap>
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      </GoogleMap>
    </div>
  );
}



/*
import Header from './components/Header';
import Map from './components/Map';





const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });


  return (
    <div>
      <Header/>
      <Search />
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
*/