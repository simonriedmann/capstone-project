import React, {useState} from 'react';
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
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





import restaurantData from "./data/restaurants.json";

import Header from './components/Header';
import mapStyles from './mapStyles';



const libraries = ["places"]

const mapContainerStyle = {
  width: '100vw', height: '70vh'
}

const center = { lat: 48.269789183437375, lng: 11.193012202583548 }

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}


export default function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE__MAPS_API_KEY,
    libraries,
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  
  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps";
  


  return (
    <div>


      <Header/>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onLoad={onMapLoad}

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


      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );

    </div>
  )
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}





function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 48.269789183437375, lng: () => 11.193012202583548 },
      radius: 200 * 1000,
    },
  });


  
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setValue('')
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}



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

  else if (type === "Vegan" || type === "Vegetarian" ) {

    return {
      url: "/vegan.svg",
      scaledSize: new window.google.maps.Size(25, 25)
    }
  } 

  else if (type === "German") {

    return {
      url: "/pretzel.svg",
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



