export const getBounds = (geojson: Object) => {
  const coords = [];
  geojson.features.forEach((feature) => {

    // For gpx waypoints
    // if (feature.geometry.type == 'Point') {
    //   const [lon, lat] = feature.geometry.coordinates;
    //   coords.push([lon, lat]);
    // }
    
    // For gpx tracks / routes
    if (feature.geometry.type == 'LineString') {
      feature.geometry.coordinates.forEach(([lon, lat]) => {
        coords.push([lon, lat]);
      })
    }
  })

  let north = coords[0][1], south = coords[0][1], east = coords[0][0], west = coords[0][0];
  coords.forEach(([lon, lat]) => {
    west = Math.min(west, lon);
    east = Math.max(east, lon);
    south = Math.max(south, lat);
    north = Math.min(north, lat);
  })
  const bounds = [[west, south], [east, north]];
  return bounds;
};

export const getEndpoints = (geojson: Object) => {
  const first = [], last = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type == 'LineString') {
      const coords = feature.geometry.coordinates;
      first.push(...coords[0]);
      last.push(...coords[coords.length - 1]);
    }
  })
  return { first, last };
}