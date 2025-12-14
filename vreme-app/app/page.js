"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import WeatherBackground from "@/components/WeatherBackground";
import Favorites from "@/components/Favorites";


const Auth = dynamic(() => import("@/components/Auth"), { ssr: false });
const WeatherMap = dynamic(() => import("@/components/WeatherMap"), { ssr: false });
const Favorites = dynamic(() => import("@/components/Favorites"), { ssr: false });
export default function Home() {
  const [user, setUser] = useState(null);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const getWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
    if (!apiKey) return alert("API key ni nastavljen!");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) return alert(data.message);
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      <WeatherBackground weather={weather} />

      
      <div className="absolute top-4 right-4 z-10">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Odjava
          </button>
        ) : (
          <Auth onLogin={setUser} />
        )}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          🌤️ Weather App
        </h1>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Vnesi mesto"
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={getWeather}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Prikaži vreme
        </button>

        
        {weather && weather.coord && (
          <div className="bg-white mt-4 p-4 rounded shadow">
            <h2 className="text-xl font-bold">{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p className="text-lg">{weather.main.temp} °C</p>

            <div className="h-64 mt-3">
              <WeatherMap
                lat={weather.coord.lat}
                lon={weather.coord.lon}
                city={weather.name}
                description={weather.weather[0].description}
              />
            </div>
          </div>
        )}

        
        {user ? (
          weather && <Favorites weather={weather} />
        ) : (
          <p className="mt-6 text-center text-gray-700">
             Prijavi se za shranjevanje priljubljenih mest
          </p>
        )}
      </div>
    </div>
  );
}
