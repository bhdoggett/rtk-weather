import type { cityWeather } from "./cityWeather";

export type weatherState = {
  currentWeatherQuery: {};
  status: string;
  coordinates: {};
  error: string | null;
  cities: cityWeather[];
  defaultCity: {};
};
