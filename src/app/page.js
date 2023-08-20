"use client";
import { useEffect, useState } from "react";

import TopNav from "./components/TopNav";
import DailyData from "./components/DailyData";
import Highlights from "./components/Highlights";
import SideDashBoard from "./components/SideDashBoard";
import Heading from "./components/Heading";

export default function Home() {
  const [weather, setWeather] = useState();
  const [weeklyWeather, setWeeklyWeather] = useState();
  // const [location, setLocation] = useState();

  //use geolocation to locate weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchWeatherData({ lat, lng });
        fetchWeeklyWeatherData({ lat, lng });
      }),
        (error) => {
          console.error("Error getting user location:", error);
        };
    }
  }, []);

  const fetchWeatherData = async ({ lat, lng }) => {
    const res = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const { data } = await res.json();
    setWeather(data[0]);
  };
  const fetchWeeklyWeatherData = async ({ lat, lng }) => {
    const res = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.NEXT_PUBLIC_API_KEY}&days=5`
    );
    const { data } = await res.json();
    setWeeklyWeather(data);
  };

  // const getLocation = async () => {
  //   const resp = await fetch("https://geolocation-db.com/json/");
  //   const data = await resp.json();
  //   return data;
  // };

  //use ip api to locate weather
  // useEffect(() => {
  //   if (!location) {
  //     fetch("https://geolocation-db.com/json/")
  //       .then((resp) => resp.json())
  //       .then(({ latitude, longitude }) => {
  //         fetchWeatherData({ lat: latitude, lng: longitude });
  //         fetchWeeklyWeatherData({ lat: latitude, lng: longitude });
  //       }).catch(err => console.log(err))
  //   }
  // },[]);

  if (!weather)
    return (
      <main className="flex min-h-screen flex-col md:items-center md:justify-between p-10 md:p-24">
        <p className="text-slate-800 dark:text-slate-400">Loading...</p>
      </main>
    );

  return (
    weather && (
      <main className="max-w-7xl p-5 lg:p-24">
        <TopNav setWeather={setWeather} setWeeklyWeather={setWeeklyWeather} />

        <div className="mx-auto grid md:grid-cols-3 gap-4">
          {/* Right Section */}
          <div className="col-span-1 px-0 md:px-5">
            <SideDashBoard weather={weather} />
          </div>

          <div className="md:col-span-2">
            <Heading>This Week</Heading>
            {/* Weekly Weather Updates */}
            <ul className="grid grid-cols-5 gap-2 lg:gap-4 my-4">
              {weeklyWeather &&
                weeklyWeather.map((weather) => (
                  <DailyData key={weather.valid_date} weather={weather} />
                ))}
            </ul>

            {/* Highlights */}
            <Heading>Today's Highlights</Heading>
            <Highlights weather={weather} />
          </div>
        </div>
      </main>
    )
  );
}
