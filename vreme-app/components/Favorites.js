"use client";
import { useState, useEffect } from "react";

export default function Favorites({ weather }) {
  const [favorites, setFavorites] = useState([]);
  const [name, setName] = useState("");

  
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(saved);
    } catch {
      setFavorites([]);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  
  const addFavorite = () => {
    if (!weather) return alert("Najprej pridobi vreme!");
    if (!name) return alert("Vnesi ime priljubljenega mesta!");

    const newFav = {
      id: Date.now(),
      name,
      city: weather.name,
      temp: weather.main.temp,
      description: weather.weather[0].description,
      image: null, 
    };
    setFavorites([...favorites, newFav]);
    setName("");
  };

  
  const handleDelete = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

 
  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFavorites((prev) =>
        prev.map((fav) =>
          fav.id === id ? { ...fav, image: reader.result } : fav
        )
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Priljubljena mesta</h2>

      <div className="flex mb-4 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ime priljubljenega mesta"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={addFavorite}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Dodaj
        </button>
      </div>

      {favorites.length === 0 && <p>Ni dodanih mest.</p>}

      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="border rounded p-3 mb-3 flex flex-col gap-2 bg-white shadow"
        >
          <div className="flex justify-between items-center">
            <strong>
              {fav.name} ({fav.city})
            </strong>
            <button
              onClick={() => handleDelete(fav.id)}
              className="text-red-600 hover:underline"
            >
              Izbriši
            </button>
          </div>
          <p>
            {fav.description} - {fav.temp}°C
          </p>
          {fav.image && typeof fav.image === "string" && (
            <img
              src={fav.image}
              alt="icon"
              className="h-24 w-24 object-cover rounded"
            />
          )}
          <input
            type="file"
            onChange={(e) => handleFileUpload(e, fav.id)}
            className="mt-2"
          />
        </div>
      ))}
    </div>
  );
}
