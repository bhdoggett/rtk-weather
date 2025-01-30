"use client";

import { fetchWeather } from "./store/slices/weather";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChartGroup from "./components/chartGroup";
import type { CityProcessedData } from "./types/CityProcessedData";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.weather.cities);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    dispatch(fetchWeather(query));
    setQuery("");
    return cities;
  };

  console.log(cities);
  return (
    <div className="content-center">
      <h1 className="text-xl font-extrabold text-center m-4">
        Five-Day Weather Charts
      </h1>
      <form onSubmit={handleSubmitQuery} className="mx-auto my-3 w-1/2">
        <input
          type="text"
          id="query"
          placeholder="City, State, Country"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="focus:outline-none border rounded-l-md border-slate-500 py-1 px-2 w-2/3"
          required
        />
        <button
          className="bg-black rounded-r-md text-white border-black py-1 px-2 w-1/3"
          type="submit"
        >
          Search
        </button>
      </form>

      {cities[0] && (
        <div className="grid grid-cols-4 gap-2 text-center mb-1">
          <div className="font-bold text-lg">City</div>
          <div className="font-bold text-lg">Temperature</div>
          <div className="font-bold text-lg">Pressure</div>
          <div className="font-bold text-lg">Humidity</div>
        </div>
      )}
      <hr />
      {cities[0] &&
        cities.map((city: CityProcessedData) => (
          <ChartGroup city={city} key={city.cityId} />
        ))}
    </div>
  );
};

export default Home;
