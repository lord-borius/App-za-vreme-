"use client";
import { useState, useEffect } from "react";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  // Naloži samo na clientu
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(savedUsers);
    }
  }, []);

  const saveUsers = (updated) => {
    setUsers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(updated));
    }
  };

  const handleRegister = () => {
    if (!email || !password) return alert("Izpolni vsa polja!");
    const exists = users.find((u) => u.email === email);
    if (exists) return alert("Uporabnik že obstaja!");

    const newUsers = [...users, { email, password }];
    saveUsers(newUsers);
    alert("Registracija uspešna!");
    setIsLogin(true);
  };

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return alert("Napačni podatki!");

    if (typeof window !== "undefined") {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    }
    onLogin(user);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Prijava" : "Registracija"}</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Geslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={isLogin ? handleLogin : handleRegister}
        className={`w-full px-4 py-2 rounded text-white ${
          isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLogin ? "Prijava" : "Registracija"}
      </button>

      <p
        className="mt-4 text-blue-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Nimaš računa? Registriraj se" : "Že imaš račun? Prijavi se"}
      </p>
    </div>
  );
}
