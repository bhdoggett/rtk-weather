"use client";

import { fetchWeather } from "./store/slices/weather";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Chart from "./components/chart";
import type { weatherState } from "./types/weatherState";
import { indexData } from "./types/indexData";
import type { cityProcessedData } from "./types/cityProcessedData";

type weatherPropsType = {
  data: number[];
  avg: string;
  color: string;
};

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.currentWeatherQuery);
  const cities = useSelector((state) => state.weather.cities);

  console.log("weather Redux state:", weather);
  console.log("weather Redux state CITIES:", cities);

  const weatherCharts = (city: cityProcessedData): weatherPropsType[] => {
    return [
      {
        data: city.allTemps,
        avg: city.avgTemp,
        color: "orange",
      },
      {
        data: city.allPressures,
        avg: city.avgPressure,
        color: "purple",
      },
      {
        data: city.allHumidities,
        avg: city.avgHumidity,
        color: "green",
      },
    ];
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log("Dispatching fetchWeather with query:", query);
    dispatch(fetchWeather(query));
    setQuery("");
    return cities;
  };

  console.log("weather:", weather);

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
        cities.map((city: cityProcessedData) => (
          <div
            className="grid grid-cols-4 gap-2 text-center hover:bg-slate-100"
            key={city.cityId}
          >
            <div className="font-medium text-sm my-auto">{city.city}</div>
            {weatherCharts(city).map((props) => (
              <Chart {...props} key={props.avg} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Home;
