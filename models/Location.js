/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  instagram: String,
  flag: String
});

const Location = mongoose.model('Location', LocationSchema);
export default Location;