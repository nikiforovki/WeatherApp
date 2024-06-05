import { createReducer } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  updateCity,
} from '../actions/actions';

const initialState = {
  weatherData: null,
  error: null,
  city: '',
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload;
    })
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    });
});

export const putWeatherData = (data) => ({
  type: 'PUT_WEATHER_DATA',
  payload: data,
});

// Исправленные селекторы
export const selectTemperature = createSelector(
  (state) => state.weatherData,
  (weatherData) => weatherData?.current?.temp ?? null,
);

export const selectFirstSixHours = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.slice(0, 6).map((item) => item.temp),
);

export const selectCurrentWeatherDetails = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.temp,
);

export const selectSunrise = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.sunrise,
);

export const selectSunset = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.sunset,
);

export const selectFeelsLike = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.feels_like,
);

export const selectPrecipitation = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.clouds,
);

export const selectPressure = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.pressure,
);

export const selectHumidity = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.humidity,
);

export const selectVisibility = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.visibility,
);

export const selectWindSpeed = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => currentWeather?.wind_speed,
);

export const selectDescriptionIcon = createSelector(
  (state) => state.weatherData?.current?.weather[0],
  (weather) => weather?.description,
);

export const selectHourlyData = createSelector(
  (state) => state.weatherData?.hourly,
  (hourly) => hourly.map((item) => item.weather[0]?.description),
);

export const selectHourlyTemp = createSelector(
  (state) => state.weatherData?.hourly,
  (hourly) => hourly.map((item) => item.temp),
);

export const selectHourlyTime = createSelector(
  (state) => state.weatherData?.hourly,
  (hourly) => hourly.map((item) => item.dt_txt), // Предполагается, что dt_txt содержит время
);

export const selectTimezone = createSelector(
  (state) => state.weatherData?.timezone,
  (timezone) => timezone,
);

export default weatherReducer;
