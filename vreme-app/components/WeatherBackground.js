"use client";
export default function WeatherBackground({ weather }) {
  if (!weather || !weather.weather) return null;

  const main = weather.weather[0].main.toLowerCase();

  if (main.includes("clear")) {
    
    return (
      <div className="absolute inset-0 bg-yellow-200">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-400 animate-pulse opacity-80"></div>
      </div>
    );
  }

  if (main.includes("cloud")) {
    
    return (
      <div className="absolute inset-0 bg-gray-400">
        <div className="absolute top-20 left-10 w-40 h-24 bg-gray-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-32 right-16 w-48 h-28 bg-gray-300 rounded-full animate-pulse opacity-70"></div>
      </div>
    );
  }

  if (main.includes("rain") || main.includes("drizzle")) {
    
    return (
      <div className="absolute inset-0 bg-blue-700">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-6 bg-blue-300 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  }

  if (main.includes("snow")) {
    
    return (
      <div className="absolute inset-0 bg-white">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-200 rounded-full animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  }

  
  return <div className="absolute inset-0 bg-blue-50"></div>;
}
