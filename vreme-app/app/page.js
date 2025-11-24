"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">🌤️ Weather App</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Vnesi mesto..."
        className="border border-blue-300 p-3 rounded w-72 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={getWeather}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Prikaži vreme
      </button>

      {weather && weather.main && (
        <div className="mt-6 bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
          <p className="mb-1 capitalize">{weather.weather[0].description}</p>
          <p className="text-xl font-bold">🌡️ {weather.main.temp} °C</p>

          
          <div className="mt-4 h-64 w-full">
            <MapContainer
              center={[weather.coord.lat, weather.coord.lon]}
              zoom={10}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[weather.coord.lat, weather.coord.lon]}>
                <Popup>
                  {weather.name} - {weather.weather[0].description}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
