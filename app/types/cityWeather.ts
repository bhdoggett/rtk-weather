import type { IndexData } from "./IndexData";

export type CityWeather = {
  city: { name: string };
  list: IndexData[];
};
