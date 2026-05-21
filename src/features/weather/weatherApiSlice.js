import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//axios
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/myThunkFunction",
  async () => {
    console.log("calling fetch weather");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: 26.820553,
          lon: 30.802498,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
        },
      },
    );

    console.log("the respone is", response);
    //handle success
    const responsTemp = Math.round(response.data.main.temp - 273.15);
    const responsTempMin = Math.round(response.data.main.temp_min - 273.15);
    const responsTempMax = Math.round(response.data.main.temp_max - 273.15);
    const responseDes = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;
    console.log(
      responsTemp,
      responsTempMin,
      responsTempMax,
      responseDes,
      responseIcon,
    );
    return {
      temperature: responsTemp,
      description: responseDes,
      min: responsTempMin,
      max: responsTempMax,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  },
);

const initialState = {
  result: null,
  weather: {
    temperature: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  },
  isLoading: false,
};

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState,
  reducers: {
    changeResult: (currentState, action) => {
      currentState.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("======*=*=*====");
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

//actions
export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
