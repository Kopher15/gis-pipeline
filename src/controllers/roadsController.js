'use strict';

const roadsService = require('../services/roadsService');

async function getAllRoads(req, res) {
  try {
    const geojson = await roadsService.getAllRoadsAsGeoJSON();
    res.status(200).json(geojson);
  } catch (err) {
    console.error('GET /roads failed:', err.message);
    res.status(500).json({
      error: 'Failed to fetch roads',
      detail: err.message
    });
  }
}

module.exports = { getAllRoads };