import type { indexData } from "./indexData";

export type cityWeather = {
  city: { name: string };
  list: indexData[];
};
