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
    if (mapRef.current) return; 

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

  async function fetchWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch weather data.');
      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Error fetching weather data.');
      return null;
    }
  }

  async function fetchTimezone(lat, lng) {
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch timezone data.');
      return await response.json();
    } catch (error) {
      console.error(error);
      alert('Error fetching timezone data.');
      return null;
    }
  }

  function closePopup() {
    setPopupData(null);
  }