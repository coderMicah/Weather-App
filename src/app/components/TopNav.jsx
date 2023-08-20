"use client"
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import DarkModeButton from "./DarkMode";

function TopNav({ setWeather, setWeeklyWeather }) {
  const { register, handleSubmit,reset } = useForm();

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
    reset();
  };
  return (
    <div className="flex gap-4 md:gap-8 py-5 md:py-0 justify-between md:justify-end">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-slate-900 dark:text-white sr-only "
      >
        Search
      </label>
      <div className="relative">
        <input
          id="search"
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
    <DarkModeButton/>
    </div>
  );
}

export default TopNav;
