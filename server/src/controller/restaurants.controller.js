import { Restaurant } from '../models/Restaurant.model.js';
import { findAll, findById, saveToDb } from '../lib/databaseHelpers.js';

async function getRestaurants(_, res) {
  try {
    const restaurant = await findAll(Restaurant);
    res.json(restaurant);
  } catch (error) {
    res.json(error);
  }
}

async function getRestaurant(req, res) {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await findById(Restaurant, restaurantId);
    res.json(restaurant);
  } catch (error) {
    res.json(error);
  }
}

async function postRestaurant(req, res) {
  const newRestaurant = new Restaurant({
    name: req.body.name,
    type: req.body.type,
    website: req.body.website,
    street: req.body.street,
    postal_code: req.body.postal_code,
    city: req.body.city,
    phone: req.body.phone,
    coordinates: req.body.coordinates,
  });
  try {
    const restaurant = await saveToDb(newRestaurant);
    res.json(restaurant);
  } catch (error) {
    res.json(error);
  }
}

export { getRestaurants, postRestaurant, getRestaurant };
