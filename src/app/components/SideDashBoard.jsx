"use client"
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";


function SideDashBoard({weather}) {
  return (
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
  );
}

export default SideDashBoard;
