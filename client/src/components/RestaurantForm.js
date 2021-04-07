import { useState } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Button from './Button'


export default function RestaurantForm({ onSubmitForm }) {
  const initialRestaurant = {
    name: "",
    type: "",
    website: "",
    street: "",
    postal_code: "",
    city: "",
    phone: "",
    coordinates: []
}
  const [restaurant, setRestaurant] = useState(initialRestaurant);

  const handleChange = (event) => {
    const field = event.target;
    let value = event.target.value;
    setRestaurant({ ...restaurant, [field.name]: value });
  };


  const isValidRestaurantName = (name) => name.length >= 3;

  const isValidRestaurantEntry = (restaurant) =>
    isValidRestaurantName(restaurant.name);

  function submitForm(event) {
    if (isValidRestaurantEntry(restaurant)) {
      event.preventDefault();
      onSubmitForm(restaurant);
      setRestaurant(initialRestaurant);
    } else {
      alert('Not a valid restaurant entry');
    }
  }

  function resetForm() {
    console.log('call me maybe');
    setRestaurant(initialRestaurant);
  }

  return (
    <Form onSubmit={submitForm}>
      <h2>Add new Restaurant</h2>

      <label htmlFor="name">Restaurant Name</label>
      <input
        type="text"
        name="name"
        value={restaurant.name}
        onChange={handleChange}
      />

      <RestaurantType>
        <label htmlFor="type">Restaurant Type</label>
        <select
          name="type"
          value={restaurant.type}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Italian">Italian</option>
          <option value="German">German</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Cafe">Cafe</option>
          <option value="Bakery">Bakery</option>
          <option value="Ice Cream">Ice Cream</option>
        </select>
      </RestaurantType>

      <Contact>

      <label htmlFor="website">Website</label>
      <input
        type="text"
        name="website"
        value={restaurant.website}
        onChange={handleChange}
      />

      <label htmlFor="street">Street</label>
      <input
        type="text"
        name="street"
        value={restaurant.street}
        onChange={handleChange}
      />

      <label htmlFor="postal_code">Postal code</label>
      <input
        type="text"
        name="postal_code"
        value={restaurant.postal_code}
        onChange={handleChange}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        value={restaurant.city}
        onChange={handleChange}
      />

      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        name="phone"
        value={restaurant.phone}
        onChange={handleChange}
      />

      </Contact>

      <label htmlFor="coordinates_latitude">Coordinate Latitude</label>
      <input
        type="text"
        name="coordinates_latitude"
        value={restaurant.coordinates[0]}
        onChange={handleChange}
      />

      <label htmlFor="coordinates_longitude">Coordinate Longitude</label>
      <input
        type="text"
        name="coordinates_longitude"
        value={restaurant.coordinates[1]}
        onChange={handleChange}
      />
  


      <Buttons>
        <Button text="Add" color="orange" />
        <Button type="reset" color="lightgrey" text="Reset" handlerFn={resetForm} />
      </Buttons>
    </Form>
  );
}

RestaurantForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

const Form = styled.form`
  background: white;
  display: grid;
  gap: 0.5rem;
  max-width: 500px;
  margin: 0 auto;
  input[type='checkbox'] {
    transform: scale(1.4);
    margin-right: 0.5rem;
  }
  input[type='radio'] {
    transform: scale(1.4);
    margin-right: 0.5rem;
  }
`;

const RestaurantType = styled.div`
  display: grid;
  gap: 1rem;
`;

const Contact = styled.div`
  display: grid;
  input {
    margin-top: 0.5rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.5rem;
  button {
    width: 48%;
  }
`;


