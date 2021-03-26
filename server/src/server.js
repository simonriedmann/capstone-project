import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantsRoutes from './routes/restaurantsRoutes.routes.js';


const result = dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
const DB_NAME = process.env.DB_NAME || 'glutenfree-restaurants';

const connectionString = 'mongodb+srv://garfiled:<password>@cluster0.qdwtp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
/*`mongodb://localhost:27017/${DB_NAME}`;*/


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.get('/', (req, res) =>
  res.json({ status: 'Server is up and running.' })
);

server.use('/api', [
  restaurantsRoutes,

]);

const port = 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));
