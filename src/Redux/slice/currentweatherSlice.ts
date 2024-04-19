import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
} from '../actions/actions';

const initialState = {
  weather: {
    weatherData: null,
    error: null,
  },
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weather.weatherData = action.payload;
      state.weather.error = null;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.weather.error = action.payload;
    });
});

export default weatherReducer;
