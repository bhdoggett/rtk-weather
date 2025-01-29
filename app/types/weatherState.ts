import type { cityWeather } from "./CityWeather";

export interface WeatherState {
  status: string;
  error: string | null;
  cities: cityWeather[];
}
