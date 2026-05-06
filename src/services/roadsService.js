'use strict';

const { Pool } = require('pg');

// Supabase / Postgres connection
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false }
});

// Main function: returns GeoJSON FeatureCollection
async function getAllRoadsAsGeoJSON() {
try {
const query = `       SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', COALESCE(jsonb_agg(feature), '[]'::jsonb)
      ) AS geojson
      FROM (
        SELECT jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geom)::jsonb,
          'properties', jsonb_build_object(
            'id', id,
            'r_name', r_name,
            'r_con', r_con,
            'district', district,
            'brgy_name', brgy_name,
            'r_length', r_length,
            'r_class', r_class,
            'r_importan', r_importan,
            's_type', s_type
          )
        ) AS feature
        FROM public.road_inventory
        WHERE geom IS NOT NULL
      ) features_subquery;
    `;

```
const result = await pool.query(query);

// safety check
if (!result.rows || result.rows.length === 0) {
  return {
    type: 'FeatureCollection',
    features: []
  };
}

return result.rows[0].geojson;
```

} catch (err) {
console.error('ROADS SERVICE ERROR:', err);
throw err; // let controller handle response
}
}

module.exports = {
getAllRoadsAsGeoJSON
};
