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
        "'r_name', \"r_name\", " +         // Use \" for column names
        "'r_con', \"r_con\", " +           // Use \" for column names
        "'district', \"district\", " +     // Use \" for column names
        "'brgy_name', \"brgy_name\", " +   // Use \" for column names
        "'r_length', \"r_length\", " +     // CRITICAL: This fixes the r_length error
        "'r_class', \"r_class\", " +       // Use \" for column names
        "'r_importan', \"r_importan\", " + // Use \" for column names
        "'s_type', \"s_type\"" +           // Use \" for column names
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
