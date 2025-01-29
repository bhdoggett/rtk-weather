"use client";

import { fetchWeather } from "./store/slices/weather";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Chart from "./components/chart";

type weatherPropsType = {
  data: number[];
  avg: string;
  color: string;
};

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.currentWeatherQuery);

  console.log("weather Redux state:", weather);

  const cityCharts: weatherPropsType[] = [
    {
      data: weather.allTemps,
      avg: weather.avgTemp,
      color: "yellow",
    },
    {
      data: weather.allPressures,
      avg: weather.avgPressure,
      color: "red",
    },
    {
      data: weather.allHumidities,
      avg: weather.avgHumidity,
      color: "green",
    },
  ];

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log("Dispatching fetchWeather with query:", query);
    dispatch(fetchWeather(query));

    return weather;
  };

  console.log("weather:", weather);
  const data = [1, 5, 4, 7, 2];
  return (
    <div className="content-center">
      <h1 className="text-xl text-center">Weather Project</h1>

      <form onSubmit={handleSubmitQuery} className="text-center">
        <input
          type="text"
          id="query"
          placeholder="City, State, Country"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary search" type="submit">
          Search
        </button>
      </form>
      {weather && (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="font-bold text-lg">City</div>
          <div className="font-bold text-lg">Temperature</div>
          <div className="font-bold text-lg">Pressure</div>
          <div className="font-bold text-lg">Humidity</div>
        </div>
      )}
      {weather && (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="font-bold text-md align-">{weather.city}</div>
          {cityCharts.map((props) => (
            <Chart {...props} key={props.avg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
