import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (query) => {
    console.log("query:", query);
    const urlNoCoordinates = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    console.log("url:", urlNoCoordinates);
    const response = await axios.get(urlNoCoordinates);
    console.log("axios response:", response);
    return response.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    status: "idle",
    coordinates: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
