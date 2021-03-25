import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  website: { type: String, required: true },
  street: { type: String, required: true },
  postal_code: { type: Number, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  coordinates: { type: Array, required: true },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export { Restaurant, restaurantSchema };
