import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type indexData = { main: { humidity: number; pressure: number; temp: number } };
type dataAll = {
  city: { name: string };
  list: indexData[];
};

const getAvgData = (data: dataAll, dataType: string): string => {
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

  for (let i = 0; i <= data.list.length; i++) {
    const current = data.list[i].main[dataType];
    acc += (current - acc) / (index + 1);
    index++;
  }

  console.log(`${parseInt(acc.toFixed(1))} ${units}`);

  return `${parseInt(acc.toFixed(1))} ${units}`;
};

const allDataByType = (data: dataAll, dataType: string): number[] => {
  const dataArray = [];

  data.list.forEach((data) => dataArray.push(data));

  // for (let i = 0; i <= data.list.length; i++) {
  //   dataArray.push(data.list[i].main[dataType]);
  // }

  return dataArray;
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (query) => {
    const firstUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    console.log("firstUrl:", firstUrl);
    const responseOne = await axios.get(firstUrl);
    console.log("axios firstResponse:", responseOne);
    const secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${responseOne.data.coord.lat}&lon=${responseOne.data.coord.lon}&appid=${apiKey}`;
    console.log("secondUrl:", secondUrl);
    const responseTwo = await axios.get(secondUrl);
    console.log("axios secondResponse:", responseTwo);

    return {
      city: responseTwo.data.city.name,
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
    currentWeatherQuery: {},
    status: "idle",
    coordinates: {},
    error: null,
    cities: [],
    defaultCity: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentWeatherQuery = action.payload;
        state.cities.push(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
