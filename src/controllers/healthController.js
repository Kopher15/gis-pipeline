'use strict';

const pool = require('../config/database');

async function getHealth(req, res) {
  try {
    const result = await pool.query('SELECT COUNT(*)::int AS count FROM public.road_inventory;');
    const rowCount = result.rows[0].count;
    res.status(200).json({
      status: 'ok',
      db: 'connected',
      rowCount: rowCount
    });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      db: 'disconnected',
      error: err.message
    });
  }
}

module.exports = { getHealth };