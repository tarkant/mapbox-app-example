import './styles.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import CONFIG from './assets/config.json';

mapboxgl.accessToken = CONFIG.mapboxKey;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

/**
 * Minimum options for our location request
 */
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

/**
 * If the user accepts the location request
 * @param pos: GeolocationPosition
 */
function success(pos) {
  const crd = pos.coords;

  // Use the coordinates to center the camera
  map.flyTo({
    center: [crd.longitude, crd.latitude],
    zoom: 14
  });
}

/**
 * If the user refuses the location request
 * @param err: GeolocationPositionError
 */
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Request the user's location via the notification
navigator.geolocation.getCurrentPosition(success, error, options);
