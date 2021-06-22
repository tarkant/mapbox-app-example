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

fetch('https://api.techniknews.net/ipgeo/')
  .then(resp => {
    resp.json()
      .then((json) => {
        map.flyTo({
          center: [json.lon, json.lat],
          zoom: 14
        });
      });
  });
