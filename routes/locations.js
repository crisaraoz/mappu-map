/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import express from 'express';
import Location from '../models/Location.js';
const router = express.Router();
//const Location = require('../models/Location');

// GET todas las ubicaciones
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
