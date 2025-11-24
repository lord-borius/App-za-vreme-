"use client";
import { useState } from "react";
import WeatherMap from "@/components/WeatherMap";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
    if (!apiKey) {
      console.error("API key ni nastavljen!");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert(data.message);
        return;
      }
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
            <WeatherMap
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              city={weather.name}
              description={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
}
