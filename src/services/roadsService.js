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
        "'r_name', \"r_name\", " +         // Changed to escaped double quotes
        "'r_con', \"r_con\", " +           // Changed to escaped double quotes
        "'district', \"district\", " +     // Changed to escaped double quotes
        "'brgy_name', \"brgy_name\", " +   // Changed to escaped double quotes
        "'r_length', \"r_length\", " +     // THIS IS THE FIX for your log error
        "'r_class', \"r_class\", " +       // Changed to escaped double quotes
        "'r_importan', \"r_importan\", " + // Changed to escaped double quotes
        "'s_type', \"s_type\"" +           // Changed to escaped double quotes
      ')' +
    ') AS feature ' +
    'FROM public.road_inventory ' + // Ensure this table name is exactly right
    'WHERE geom IS NOT NULL' +
  ') AS features_subquery;';
async function getAllRoadsAsGeoJSON() {
  const result = await pool.query(ROADS_GEOJSON_SQL);
  return result.rows[0].geojson;
}

module.exports = { getAllRoadsAsGeoJSON };
