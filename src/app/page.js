"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { WiHumidity, WiStrongWind, WiThermometer } from "weather-icons-react";
import DarkModeButton from "./components/DarkMode";

export default function Home() {
  const [weather, setWeather] = useState();
  const [weeklyWeather, setWeeklyWeather] = useState();
  const [location, setLocation] = useState();


  const { register, handleSubmit } = useForm();



  const onSubmit = async ({ city }) => {
    const res = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.NEXT_PUBLIC_API_KEY}&days=5`
    );
    const { data } = await res.json();
    const { data: dataWeekly } = await response.json();
    setWeeklyWeather(dataWeekly);
    setWeather(data[0]);
  };

  const getLocation = async () => {
    const resp = await fetch("https://geolocation-db.com/json/");
    const data = await resp.json();
    return data;
  };

  //use geolocation to locate weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // setLocation({ lat, lng });
        // console.log({ lat, lng });
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
        <p>Loading...</p>
      </main>
    );

  return (
    weather && (
      <main className="max-w-7xl p-5 lg:p-24">
        <div className="flex gap-4 md:gap-8 py-5 md:py-0 justify-between md:justify-end">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor="default-search"
              className="mb-2 text-sm font-medium text-slate-900 dark:text-white sr-only "
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full md:px-2 py-2 text-sm text-slate-900 dark:text-white focus:outline-none border-b border-b-gray-500 bg-white dark:bg-gray-950"
                placeholder="Search for places ..."
                {...register("city")}
              />
              <button
                type="submit"
                className="text-white absolute right-0 bottom-0 focus:outline-none font-medium p-2 "
              >
                 <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </form>
          <DarkModeButton />
        </div>
        <div className="mx-auto grid md:grid-cols-3 gap-4">
          <div className="col-span-1 px-0 md:px-5">
            <div>
              <img
                className="md:mx-auto"
                src={`/icons/${weather.weather.icon}.png`}
                alt={weather.weather.description}
              />
              <h1 className="text-4xl md:text-6xl font-bold md:text-center text-slate-900 dark:text-white pt-4 ">
                {weather.temp}&deg;C
              </h1>
              <h2 className="text-lg md:text-center pt-4 text-slate-900 dark:text-white">
                {weather.weather.description}
              </h2>
              <hr className="my-4 bg-gray-500" />

              <div className="flex space-x-4 mt-4">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
                <p className="text-slate-500 dark:text-slate-400">
                  {weather.city_name}, {weather.country_code}
                </p>
              </div>

              <div className="flex space-x-4 mt-4">
                <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
                <p className="text-slate-500 dark:text-slate-400">{weather.ob_time}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg md:text-2xl font-semibold py-2 md:py-4 text-slate-900 dark:text-white">This Week</h2>
            <ul className="grid grid-cols-5 gap-2 lg:gap-4 my-4">
              {weeklyWeather &&
                weeklyWeather.map((weather) => (
                  <li
                    key={weather.valid_date}
                    className="bg-gray-200 dark:bg-slate-900 p-2 rounded-md"
                  >
                    <div className="flex flex-col items-center justify-between">
                      <p className="lg:hidden text-xs md:text-base text-slate-500 dark:text-slate-400">
                        {new Date(weather.valid_date).toLocaleDateString(
                          "en-US",
                          { weekday: "short" }
                        )}
                      </p>
                      <p className="hidden lg:block text-xs md:text-base text-slate-500 dark:text-slate-400">
                        {new Date(weather.valid_date).toLocaleDateString(
                          "en-US",
                          { weekday: "long" }
                        )}
                      </p>
                      <img
                        className="w-12"
                        src={`/icons/${weather.weather.icon}.png`}
                        alt={weather.weather.description}
                      />
                      <p className="text-xs md:text-base text-slate-500 dark:text-slate-400">{weather.high_temp}&deg;C</p>
                      {/* <p>{weather.valid_date}</p> */}
                    </div>
                  </li>
                ))}
            </ul>

            <h2 className="text-lg md:text-2xl font-semibold py-2 md:py-4 text-slate-900 dark:text-white">Today's Highlights</h2>
            <div className="my-4 grid grid-cols-3 gap-2 md:gap-4">
              <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
                <WiHumidity className="w-10 h-10 md:w-20 md:h-20"/>
                <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">{weather.rh}%</p>
                <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">Humidity</p>
              </div>
              <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
                <WiThermometer className="w-10 h-10 md:w-20 md:h-20" />
                <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">{weather.temp}</p>
                <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">Temperature</p>
              </div>
              <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
                <WiStrongWind className="w-10 h-10 md:w-20 md:h-20" />
                <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">
                  {weather.wind_spd}m/s
                </p>
                <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">Wind</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
