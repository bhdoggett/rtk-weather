import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { CityWeather } from "../../types/CityWeather";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const units = "imperial";

const getAvgData = (data: CityWeather, dataType: string): string => {
  let units = "";
  switch (dataType) {
    case "temp":
      units = "°F";
      break;
    case "pressure":
      units = "hPa";
      break;
    case "humidity":
      units = "%";
      break;
    default:
      console.error("Improper unit selected");
  }

  let acc = 0;
  let index = 0;

  for (let i = 0; i < data.list.length; i++) {
    const current = data.list[i].main[dataType];
    acc += (current - acc) / (index + 1);
    index++;
  }

  return `${parseInt(acc.toFixed(1))} ${units}`;
};

const allDataByType = (data: CityWeather, dataType: string): number[] => {
  return data.list.map((index) => index.main[dataType]);
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (query) => {
    const firstUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    const responseOne = await axios.get(firstUrl);
    const secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${responseOne.data.coord.lat}&lon=${responseOne.data.coord.lon}&appid=${apiKey}&units=${units}`;
    const responseTwo = await axios.get(secondUrl);

    return {
      city: responseTwo.data.city.name,
      cityId: uuidv4(),
      allTemps: allDataByType(responseTwo.data, "temp"),
      avgTemp: getAvgData(responseTwo.data, "temp"),
      allPressures: allDataByType(responseTwo.data, "pressure"),
      avgPressure: getAvgData(responseTwo.data, "pressure"),
      allHumidities: allDataByType(responseTwo.data, "humidity"),
      avgHumidity: getAvgData(responseTwo.data, "humidity"),
    };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    status: "idle",
    error: null,
    cities: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = [...state.cities, action.payload];
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
