import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  updateCity,
  putWeatherData,
  fetchWeatherDataByCityNameRequest,
  fetchWeatherDataByCityNameSuccess,
  fetchWeatherDataByCityNameFailure,
  toggleTemperatureScale,
} from '../actions/actions';

const initialState = {
  weatherData: null,
  error: null,
  city: '',
  temperatureScale: 'C',
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
    })
    .addCase(toggleTemperatureScale, (state, action) => {
      state.temperatureScale = action.payload;
    });
});

export const selectFirstSixHours = (state) => state.weatherData?.current;

export const selectCurrentWeatherDetails = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.temp : null),
);

export const selectSunrise = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.sunrise : null),
);

export const selectSunset = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.sunset : null),
);

export const selectFeelsLike = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.feels_like : null),
);

export const selectPrecipitation = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.clouds : null),
);

export const selectPressure = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.pressure : null),
);

export const selectHumidity = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.humidity : null),
);

export const selectVisibility = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.visibility : null),
);

export const selectWindSpeed = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.wind_speed : null),
);

export const selectDescriptionIcon = createSelector(
  (state) => state.weatherData?.current?.weather[0]?.description,
  (description) => description,
);

export const selectHourlyData = createSelector(
  (state) => state.weatherData?.hourly,
  (hourlyData) =>
    hourlyData ? hourlyData.map((item) => item.weather[0].description) : [],
);

export const selectHourlyTemp = createSelector(
  (state) => state.weatherData?.hourly,
  (hourlyData) => (hourlyData ? hourlyData.map((item) => item.temp) : []),
);
export const selectHourlyTime = createSelector(
  (state) => state.weatherData?.hourly,
  (hourlyData) => (hourlyData ? hourlyData.map((item) => item.time) : []),
);

export const selectTimezone = createSelector(
  (state) => state.weatherData?.timezone,
  (timezone) => timezone,
);

export const selectCity = createSelector(
  (state) => state.city,
  (city) => city,
);

export const selectTemperature = createSelector(
  (state) => state.weatherData?.current,
  (currentWeather) => (currentWeather ? currentWeather.temp : null),
);
export const selectTemperatureScale = createSelector(
  (state) => state.temperatureScale,
  (temperatureScale) => temperatureScale,
);

export default weatherReducer;

// import { createReducer } from '@reduxjs/toolkit';
// import { createSelector } from '@reduxjs/toolkit';
// import {
//   fetchCurrentWeatherRequest,
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
//   updateCity,
//   putWeatherData,
//   fetchWeatherDataByCityNameRequest,
//   fetchWeatherDataByCityNameSuccess,
//   fetchWeatherDataByCityNameFailure,
// } from '../actions/actions';

// const initialState = {
//   weatherData: null,
//   error: null,
//   city: '',
// };

// const weatherReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(fetchCurrentWeatherRequest, (state) => {
//       state.error = null;
//     })
//     .addCase(fetchCurrentWeatherSuccess, (state, action) => {
//       state.weatherData = action.payload;
//       state.error = null;
//     })
//     .addCase(fetchCurrentWeatherFailure, (state, action) => {
//       state.error = action.payload;
//     })
//     .addCase(updateCity, (state, action) => {
//       state.city = action.payload;
//     })
//     .addCase(putWeatherData, (state, action) => {
//       state.weatherData = action.payload;
//     })
//     .addCase(fetchWeatherDataByCityNameRequest, (state) => {
//       state.error = null;
//     })
//     .addCase(fetchWeatherDataByCityNameSuccess, (state, action) => {
//       state.weatherData = action.payload;
//       state.error = null;
//     })
//     .addCase(fetchWeatherDataByCityNameFailure, (state, action) => {
//       state.error = action.payload;
//     });
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
//   return state.weatherData.hourly.map((item) => item.time);
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
