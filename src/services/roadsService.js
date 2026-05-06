'use strict';

const pool = require('../config/database');

const ROADS_GEOJSON_SQL =
  'SELECT json_build_object(' +
    "'type', 'FeatureCollection', " +
    "'features', COALESCE(json_agg(feature), '[]'::json)" +
  ') AS geojson ' +
  'FROM (' +
    'SELECT json_build_object(' +
      "'type', 'Feature', " +
      "'id', id, " +
      "'geometry', ST_AsGeoJSON(geom)::json, " +
      "'properties', json_build_object(" +
        "'r_name', \"r_name\", " +         // Added double quotes
        "'r_con', \"r_con\", " +           // Added double quotes
        "'district', \"district\", " +     // Added double quotes
        "'brgy_name', \"brgy_name\", " +   // Added double quotes
        "'r_length', \"r_length\", " +     // This fixes the r_length error
        "'r_class', \"r_class\", " +       // Added double quotes
        "'r_importan', \"r_importan\", " + // Added double quotes
        "'s_type', \"s_type\"" +           // Added double quotes
      ')' +
    ') AS feature ' +
    'FROM public.road_inventory ' +
    'WHERE geom IS NOT NULL' +
  ') AS features_subquery;';

async function getAllRoadsAsGeoJSON() {
  const result = await pool.query(ROADS_GEOJSON_SQL);
  return result.rows[0].geojson;
}

module.exports = { getAllRoadsAsGeoJSON };
