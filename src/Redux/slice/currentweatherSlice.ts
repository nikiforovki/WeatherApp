import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
} from '../actions/actions';

const initialState = {
  weather: {
    weatherData: null,
    error: null,
  },
  isLoading: true, // Добавлено
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weather.weatherData = action.payload;
      state.weather.error = null;
      state.isLoading = false;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.weather.error = action.payload;
      state.isLoading = false;
    });
});

export default weatherReducer;
