"use client";
import { fetchFiveDay } from "./store/slices/weather";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const fiveDayForecast = useSelector((state) => state.weather.weather);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log("Dispatching fetchFiveDay with query:", query);
    dispatch(fetchFiveDay(query));

    return fiveDayForecast;
  };

  console.log("fiveDayForecast:", fiveDayForecast);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="page-header my-3">
            <h1>Weather Project</h1>
          </div>
        </div>

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
      </div>

      <hr />
    </>
  );
};

export default Home;
