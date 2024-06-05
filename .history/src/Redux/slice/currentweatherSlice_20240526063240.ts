import { createReducer } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  updateCityAndTimezone,
} from '../actions/actions';

const initialState = {
  weatherData: null,
  error: null,
  city: '',
  timezone: 'Europe/Moscow', // Значение по умолчанию
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(updateCityAndTimezone, (state, action) => {
      state.city = action.payload.city;
      state.timezone = action.payload.timezone;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload;
    });
});

export const selectFirstSixHours = (state) => state.weatherData.current;

export const selectCurrentWeatherDetails = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.temp;
};

export const selectSunrise = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.sunrise;
};

export const selectSunset = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.sunset;
};

export const selectFeelsLike = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }
  return state.weatherData.current.feels_like;
};

export const selectPrecipitation = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }
  return state.weatherData.current.clouds;
};

export const selectPressure = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.pressure;
};

export const selectHumidity = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.humidity;
};

export const selectVisibility = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.visibility;
};

export const selectWindSpeed = (state) => {
  if (!state.weatherData || !state.weatherData.current) {
    return null;
  }

  return state.weatherData.current.wind_speed;
};

export const selectDescriptionIcon = (state) => {
  if (
    !state.weatherData ||
    !state.weatherData.current.weather[0] ||
    !state.weatherData.current.weather[0].description
  ) {
    return null;
  }
  return state.weatherData.current.weather[0].description;
};

export const selectHourlyData = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.weather[0].description);
};

export const selectHourlyTemp = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.temp);
};

//Доделать функцию, которая возвращает время и добавлять pm или am в зависимости от времени суток
export const selectHourlyTime = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.temp);
};

export const selectTimezone = (state) => {
  if (!state.weatherData || !state.weatherData.timezone) {
    return null;
  }
  return state.weatherData.timezone;
};

export const selectTemperature = createSelector(
  (state) => state.weatherData,
  (weatherData) => {
    if (!weatherData || !weatherData.current) {
      return null;
    }

    return weatherData.current.temp;
  },
);

export default weatherReducer;
