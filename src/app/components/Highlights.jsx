"use client";
import { WiHumidity, WiStrongWind, WiThermometer } from "weather-icons-react";

function Highlights({ weather }) {
  return (
    <div className="my-4 grid grid-cols-3 gap-2 md:gap-4">
      <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
        <WiHumidity className="w-10 h-10 md:w-20 md:h-20" />
        <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">
          {weather.rh}%
        </p>
        <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">
          Humidity
        </p>
      </div>
      <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
        <WiThermometer className="w-10 h-10 md:w-20 md:h-20" />
        <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">
          {weather.temp}
        </p>
        <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">
          Temperature
        </p>
      </div>
      <div className="flex flex-col items-center justify-between bg-gray-200 dark:bg-slate-900 p-4 rounded-md">
        <WiStrongWind className="w-10 h-10 md:w-20 md:h-20" />
        <p className="text-lg md:text-3xl font-bold text-slate-500 dark:text-slate-400">
          {Math.round(weather.wind_spd * 100) / 100} m/s
        </p>
        <p className="font-semibold tracking-wider text-slate-500 dark:text-slate-400">
          Wind
        </p>
      </div>
    </div>
  );
}

export default Highlights;
