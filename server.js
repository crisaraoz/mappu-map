/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import mongoose from 'mongoose';
import locationsRouter from './routes/locations.js';
//const locationsRouter = require('./routes/locations');

const app = express();

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/locations', locationsRouter);

app.listen(3000, () => console.log('Server Started'));
