import { createReducer } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  updateCity,
  putWeatherData,
  fetchWeatherDataByCityNameRequest,
  fetchWeatherDataByCityNameSuccess,
  fetchWeatherDataByCityNameFailure,
} from '../actions/actions';

const initialState = {
  weatherData: null,
  error: null,
  city: '',
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherRequest, (state) => {
      state.error = null;
    })
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload;
    })
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(putWeatherData, (state, action) => {
      state.weatherData = action.payload;
    })
    .addCase(fetchWeatherDataByCityNameRequest, (state) => {
      state.error = null;
    })
    .addCase(fetchWeatherDataByCityNameSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchWeatherDataByCityNameFailure, (state, action) => {
      state.error = action.payload;
    });
});

// Экспортируем селекторы до того, как определим их
export const selectFirstSixHours = (state) => state.weatherData.current;
export const selectCurrentWeatherDetails = (state) =>
  state.weatherData.current ? state.weatherData.current.temp : null;
export const selectSunrise = (state) =>
  state.weatherData.current ? state.weatherData.current.sunrise : null;
export const selectSunset = (state) =>
  state.weatherData.current ? state.weatherData.current.sunset : null;
export const selectFeelsLike = (state) =>
  state.weatherData.current ? state.weatherData.current.feels_like : null;
export const selectPrecipitation = (state) =>
  state.weatherData.current ? state.weatherData.current.clouds : null;
export const selectPressure = (state) =>
  state.weatherData.current ? state.weatherData.current.pressure : null;
export const selectHumidity = (state) =>
  state.weatherData.current ? state.weatherData.current.humidity : null;
export const selectVisibility = (state) =>
  state.weatherData.current ? state.weatherData.current.visibility : null;
export const selectWindSpeed = (state) =>
  state.weatherData.current ? state.weatherData.current.wind_speed : null;
export const selectDescriptionIcon = (state) =>
  state.weatherData.current && state.weatherData.current.weather[0]
    ? state.weatherData.current.weather[0].description
    : null;
export const selectHourlyData = (state) =>
  state.weatherData.hourly
    ? state.weatherData.hourly.map((item) => item.weather[0].description)
    : [];
export const selectHourlyTemp = (state) =>
  state.weatherData.hourly
    ? state.weatherData.hourly.map((item) => item.temp)
    : [];
export const selectHourlyTime = (state) =>
  state.weatherData.hourly
    ? state.weatherData.hourly.map((item) => item.time)
    : [];
export const selectTimezone = (state) => state.weatherData.timezone || null;
export const selectCity = (state) => state.city;
export const selectTemperature = (state) =>
  state.weatherData.current ? state.weatherData.current.temp : null;

// Определяем селектор для получения ошибки из состояния Redux
export const selectError = createSelector(
  (state) => state.weather.error, // Функция-селектор, которая получает ошибку
  (error) => error, // Функция-результат, которая обрабатывает полученное значение
);

export default weatherReducer;

// import { createReducer } from '@reduxjs/toolkit';
// import { createSelector } from '@reduxjs/toolkit';
// import {
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
//   updateCity,
// } from '../actions/actions';

// const initialState = {
//   weatherData: null,
//   error: null,
//   city: '',
// };

// const weatherReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(fetchCurrentWeatherSuccess, (state, action) => {
//       state.weatherData = action.payload;
//       state.error = null;
//     })
//     .addCase(fetchCurrentWeatherFailure, (state, action) => {
//       state.error = action.payload;
//     });

//   // Добавьте точку с запятой после вызова addCase
//   builder.addCase(updateCity, (state, action) => {
//     state.city = action.payload; // Обновляем состояние city
//   });
// });

// export const selectFirstSixHours = (state) => state.weatherData.current;

// export const selectCurrentWeatherDetails = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.temp;
// };

// export const selectSunrise = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.sunrise;
// };

// export const selectSunset = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.sunset;
// };

// export const selectFeelsLike = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }
//   return state.weatherData.current.feels_like;
// };

// export const selectPrecipitation = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }
//   return state.weatherData.current.clouds;
// };

// export const selectPressure = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.pressure;
// };

// export const selectHumidity = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.humidity;
// };

// export const selectVisibility = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.visibility;
// };

// export const selectWindSpeed = (state) => {
//   if (!state.weatherData || !state.weatherData.current) {
//     return null;
//   }

//   return state.weatherData.current.wind_speed;
// };

// export const selectDescriptionIcon = (state) => {
//   if (
//     !state.weatherData ||
//     !state.weatherData.current.weather[0] ||
//     !state.weatherData.current.weather[0].description
//   ) {
//     return null;
//   }
//   return state.weatherData.current.weather[0].description;
// };

// export const selectHourlyData = (state) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }
//   return state.weatherData.hourly.map((item) => item.weather[0].description);
// };

// export const selectHourlyTemp = (state) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }
//   return state.weatherData.hourly.map((item) => item.temp);
// };

// export const selectHourlyTime = (state) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }
//   return state.weatherData.hourly.map((item) => item.temp);
// };

// export const selectTimezone = (state) => {
//   if (!state.weatherData || !state.weatherData.timezone) {
//     return null;
//   }
//   return state.weatherData.timezone;
// };
// export const selectCity = createSelector(
//   (state) => state.city,
//   (city) => city,
// );

// export const selectTemperature = createSelector(
//   (state) => state.weatherData,
//   (weatherData) => {
//     if (!weatherData || !weatherData.current) {
//       return null;
//     }

//     return weatherData.current.temp;
//   },
// );

// export default weatherReducer;
