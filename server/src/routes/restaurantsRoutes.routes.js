import express from 'express';
import {
  getRestaurants,
  postRestaurant,
  getRestaurant,
} from '../controller/restaurants.controller.js';

const router = express.Router();

router.post('/restaurants', postRestaurant);
router.get('/restaurants', getRestaurants);
router.get('/restaurants/:restaurantId', getRestaurant);

export default router;
