import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "../features/weather/weatherApiSlice";

export const store = configureStore({
  reducer: {
    weatherApi: weatherApiReducer,
  },
});
