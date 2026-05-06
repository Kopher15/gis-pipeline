'use strict';

const pool = require('../config/database');

const ROADS_GEOJSON_SQL = `
  SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', COALESCE(json_agg(feature), '[]'::json)
  ) AS geojson
  FROM (
    SELECT json_build_object(
      'type', 'Feature',
      'id', id,
      'geometry', ST_AsGeoJSON(geom)::json,
      'properties', json_build_object(
        'r_name', "r_name",
        'r_con', "r_con",
        'district', "district",
        'brgy_name', "brgy_name",
        'r_length', "r_length", 
        'r_class', "r_class",
        'r_importan', "r_importan",
        's_type', "s_type"
      )
    ) AS feature
    FROM public.road_inventory
    WHERE geom IS NOT NULL
  ) AS features_subquery;
`;

module.exports = { getAllRoadsAsGeoJSON };
