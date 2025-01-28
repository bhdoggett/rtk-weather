import { combineReducers } from "redux";
import weatherReducer from "./slices/weather";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
