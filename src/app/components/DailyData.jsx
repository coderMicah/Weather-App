"use client"

function DailyData({weather}) {
  return (
    <li
     
      className="bg-gray-200 dark:bg-slate-900 p-2 rounded-md"
    >
      <div className="flex flex-col items-center justify-between">
        <p className="lg:hidden text-xs md:text-base text-slate-500 dark:text-slate-400">
          {new Date(weather.valid_date).toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </p>
        <p className="hidden lg:block text-xs md:text-base text-slate-500 dark:text-slate-400">
          {new Date(weather.valid_date).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </p>
        <img
          className="w-12"
          src={`/icons/${weather.weather.icon}.png`}
          alt={weather.weather.description}
        />
        <p className="text-xs md:text-base text-slate-500 dark:text-slate-400">
          {weather.high_temp}&deg;C
        </p>
        {/* <p>{weather.valid_date}</p> */}
      </div>
    </li>
  );
}

export default DailyData;
