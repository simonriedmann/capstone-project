import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from './lib/pathHelpers.js';

import restaurantsRoutes from './routes/restaurantsRoutes.routes.js';

const __dirname = dirname(import.meta.url);

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb://localhost:27017/glutenfree-restaurants';

const connectionString = DB_CONNECTION;


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

server.use(express.static(path.join(__dirname, '../../client/build')));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));