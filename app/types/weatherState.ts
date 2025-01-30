import type { cityWeather } from "./CityWeather";

export type WeatherState = {
  status: string;
  error: string | null;
  cities: cityWeather[];
};
