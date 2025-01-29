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

  useEffect(() => {
    console.log(weather);
  });

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

  // const temperatureProps: weatherPropType = {
  //   data: weather.allTemps,
  //   avg: weather.avgTemp,
  //   color: "yellow",
  // };

  // const pressureProps: weatherPropType = {
  //   data: weather.allPressures,
  //   avg: weather.avgPressure,
  //   color: "red",
  // };

  // const humidityProps: weatherPropType = {
  //   data: weather.allHumidities,
  //   avg: weather.avgHumidity,
  //   color: "green",
  // };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log("Dispatching fetchWeather with query:", query);
    dispatch(fetchWeather(query));

    return weather;
  };

  console.log("weather:", weather);
  const data = [1, 5, 4, 7, 2];
  return (
    <>
      <h1 className="text-xl">Weather Project</h1>

      <form onSubmit={handleSubmitQuery}>
        <input
          type="text"
          className="form-control"
          id="query"
          placeholder="City, State, Country"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary search" type="submit">
          Search
        </button>
      </form>
      {weather &&
        cityCharts.map((props) => (
          <>
            <Chart {...props} key={Math.floor(Math.random() * 1000)} />
          </>
        ))}
    </>
  );
};

export default Home;
