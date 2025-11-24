"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY; 
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">🌤️ Weather App</h1>
      <input
        className="border p-2 rounded mb-2 w-64"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Vnesi mesto..."
      />
      <button
        onClick={getWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Prikaži vreme
      </button>
 
      {weather && weather.main && (
        <div className="mt-4 bg-white p-4 rounded shadow text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p className="text-xl">🌡️ {weather.main.temp} °C</p>
        </div>
      )}
    </div>
  );
}
