"use client";

import { fetchWeather } from "./store/slices/weather";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log("Dispatching fetchWeather with query:", query);
    dispatch(fetchWeather(query));

    return weather;
  };

  console.log("weather:", weather);

  return (
    <>
      <h1>Weather Project</h1>

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

        <Sparklines data={[5, 10, 5, 20, 8, 15]}>
          <SparklinesLine />
          <SparklinesReferenceLine type="mean" />
        </Sparklines>
      </form>
    </>
  );
};

export default Home;
