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
import styled from 'styled-components';
import PropTypes from 'prop-types';
import mapStyles from '../mapStyles';




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


export default function Map({
  restaurantData,
  addFavoriteRestaurant,
  favoriteRestaurants,
}
) {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });


  const [displayedRestaurants, setDisplayedRestaurants] = useState(restaurantData);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(9);
  }, []);

  const filterByType = (typeToUpdate) => {
    setDisplayedRestaurants(
      restaurantData.filter((restaurant) => restaurant.type === typeToUpdate)
    )
  }

  const showAllRestaurants = (restaurants) => {
    setDisplayedRestaurants(restaurantData);
  }

  
  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps";

  
  return (
    <Main>
    <MapContainer>
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
        {displayedRestaurants.map(restaurant => (
            <Marker
              key={restaurant._id}
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
                    <FavoriteButton                 
                      isFavorite={favoriteRestaurants.some(
                        (favoriteRestaurant) => selectedRestaurant._id === favoriteRestaurant._id
                      )} 
                      onClick={() => addFavoriteRestaurant(selectedRestaurant)}>
                      <div></div>
                    </FavoriteButton>

                  </div>

                </InfoWindow>
              ) : null} 
      </GoogleMap>
    </MapContainer>
    
    <ButtonBox>
            
            <FilterButton onClick={() => filterByType("Italian")}>
              Show Italian
            </FilterButton>
            <FilterButton onClick={() => filterByType("German")}>
              Show German
            </FilterButton>
            <FilterButton onClick={() => filterByType("Cafe")}>
              Show Cafe
            </FilterButton>
            <FilterButton onClick={() => filterByType("Vegan" || "Vegetarian")}>
              Show Vegan/Vegetarian
            </FilterButton>
            <FilterButton onClick={() => filterByType("Bakery")}>
              Show Bakery
            </FilterButton>
            <FilterButton onClick={() => filterByType("Mexican")}>
              Show Mexican
            </FilterButton>
          
            <FilterButton onClick={() => showAllRestaurants(restaurantData)}>Reset</FilterButton>

    </ButtonBox>

    
    </Main>
    )}




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
  
  Map.propTypes = {
    restaurantData: PropTypes.array,
    addFavoriteRestaurant: PropTypes.func,
    favoriteRestaurants: PropTypes.array,

  };
  
  
  
  
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



  const Main = styled.div`
    margin-top: 6rem;
    margin-bottom: 8rem;


  `;

  const MapContainer = styled.div`
    margin-top: 6rem;
`

  const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  place-items: center;
  margin: 0.5rem auto 1rem;
  padding: 0.25rem;
  `;

  const FilterButton = styled.button`
  color: var(--grey-500);
  background: lightgrey;
  font-size: 1rem;
  border-radius: 0.5rem;
  display: flex;
  margin: 0.5rem;

  ::&after {
    background: orange;
    color: white;
  }`;

const FavoriteButton = styled.div`
  right: 2rem;
  margin-top: 0.25rem;
  position: absolute;
  top: 4.5rem;

  div {
    height: 1rem;
    width: 1rem;
    background: ${(props) =>
      props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
    transform: rotate(45deg);

    &::before {
      content: '';
      height: 1rem;
      width: 1rem;
      background: ${(props) =>
        props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
      position: absolute;
      border-radius: 50%;
      right: 10px;
      bottom: 0px;
    }
    &::after {
      content: '';
      height: 1rem;
      width: 1rem;
      background: ${(props) =>
        props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
      border-radius: 50%;
      position: absolute;
      right: 0px;
      bottom: 11px;
    }
  }
`;

  
  
  