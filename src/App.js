import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const API_KEY = '36be86306e394f9b948a73620e0e4845';
const TIMEZONE_API_KEY = 'AC3QUERYD3GQ';

export default function App() {
  const mapRef = useRef(null);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    if (mapRef.current) return; // map already initialized

    // Initialize the map
    const map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 3,
      maxZoom: 8,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const bounds = [
      [-90, -180],
      [90, 180],
    ];
    map.setMaxBounds(bounds);

    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      const weatherData = await fetchWeather(lat, lng);
      if (!weatherData) return;
      const timezoneData = await fetchTimezone(lat, lng);
      if (!timezoneData) return;

      setPopupData({
        weatherData,
        timezoneData,
        lat,
        lng,
      });
    });

    mapRef.current = map;

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);
  