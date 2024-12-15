// import { createReducer, createSelector } from '@reduxjs/toolkit';
// import {
//   fetchCurrentWeatherRequest,
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
//   updateCity,
//   putWeatherData,
//   fetchWeatherDataByCityNameRequest,
//   fetchWeatherDataByCityNameSuccess,
//   fetchWeatherDataByCityNameFailure,
//   switchTemperatureUnit,
// } from '../actions/actions';

// const initialState = {
//   weatherData: null,
//   error: null,
//   city: '',
//   temperatureScale: 'C',
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
//     })
//     // Правильно добавляем обработку действия переключения единиц измерения
//     .addCase(switchTemperatureUnit, (state, action) => {
//       if (typeof action.payload === 'string') {
//         state.temperatureScale = action.payload;
//       }
//     });
// });

// export const selectFirstSixHours = (state) => state.weatherData?.current;

// export const selectCurrentWeatherDetails = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.temp : null),
// );

// export const selectSunrise = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.sunrise : null),
// );

// export const selectSunset = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.sunset : null),
// );

// export const selectFeelsLike = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.feels_like : null),
// );

// export const selectPrecipitation = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.clouds : null),
// );

// export const selectPressure = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.pressure : null),
// );

// export const selectHumidity = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.humidity : null),
// );

// export const selectVisibility = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.visibility : null),
// );

// export const selectWindSpeed = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.wind_speed : null),
// );

// export const selectDescriptionIcon = createSelector(
//   (state) => state.weatherData?.current?.weather[0]?.description,
//   (description) => description,
// );

// export const selectHourlyData = createSelector(
//   (state) => state.weatherData?.hourly,
//   (hourlyData) =>
//     hourlyData ? hourlyData.map((item) => item.weather[0].description) : [],
// );

// export const selectHourlyTemp = createSelector(
//   (state) => state.weatherData?.hourly,
//   (hourlyData) => (hourlyData ? hourlyData.map((item) => item.temp) : []),
// );

// export const selectHourlyTime = createSelector(
//   (state) => state.weatherData?.hourly,
//   (hourlyData) => (hourlyData ? hourlyData.map((item) => item.time) : []),
// );

// export const selectTimezone = createSelector(
//   (state) => state.weatherData?.timezone,
//   (timezone) => timezone,
// );

// export const selectCity = createSelector(
//   (state) => state.city,
//   (city) => city,
// );

// export const selectTemperature = createSelector(
//   (state) => state.weatherData?.current,
//   (currentWeather) => (currentWeather ? currentWeather.temp : null),
// );

// export default weatherReducer;

import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchCityListRequest,
  fetchCityListSuccess,
  fetchCityListFailure,
  updateCity,
  putWeatherData,
  fetchWeatherDataByCityNameRequest,
  fetchWeatherDataByCityNameSuccess,
  fetchWeatherDataByCityNameFailure,
  toggleTemperatureScale,
} from '../actions/actions';

// Определение типа для данных погоды
type WeatherDataType = {
  // Здесь должны быть поля ваших данных погоды
};

interface WeatherState {
  weatherData: WeatherDataType | null;
  error: string | null;
  city: string;
  temperatureScale: 'C' | 'F';
  currentTemperatureCelsius: number | null;
  currentTemperatureFahrenheit: number | null;
}

interface RootState {
  weather: WeatherState;
  // другие разделы состояния
}

const initialState = {
  weatherData: null,
  error: null,
  city: '',
  temperatureScale: 'C',
  currentTemperatureCelsius: null,
  currentTemperatureFahrenheit: null,
  cities: [],
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherRequest, (state) => {
      state.error = null;
    })
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      console.log('Received weather data:', action.payload);
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload.message;
    })
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(putWeatherData, (state, action) => {
      console.log('Action payload for putWeatherData:', action.payload);
      const { currentTemp, windSpeed, weatherUnit } = action.payload;
      state.weatherData = action.payload;
      state.currentTemperatureCelsius =
        weatherUnit === 'metric' ? currentTemp : null;
      state.currentTemperatureFahrenheit =
        weatherUnit === 'imperial' ? currentTemp : null;
      state.windSpeedMph = weatherUnit === 'imperial' ? windSpeed : null;
      state.windSpeedMps = weatherUnit === 'metric' ? windSpeed : null;
    })
    .addCase(fetchWeatherDataByCityNameRequest, (state) => {
      state.error = null;
    })
    .addCase(fetchWeatherDataByCityNameSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchWeatherDataByCityNameFailure, (state, action) => {
      state.error = action.payload.message;
    })
    .addCase(fetchCityListSuccess, (state, action) => {
      state.cities = action.payload; // Предполагается, что action.payload содержит массив городов
    })
    .addCase(toggleTemperatureScale, (state) => {
      const newScale = state.temperatureScale === 'C' ? 'F' : 'C';
      state.temperatureScale = newScale;
      if (newScale === 'F') {
        state.currentTemperatureCelsius =
          ((state.currentTemperatureCelsius - 32) * 5) / 9;
      } else {
        state.currentTemperatureFahrenheit =
          (state.currentTemperatureCelsius * 9) / 5 + 32;
      }
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
    !state.weatherData.current.weather[0].icon
  ) {
    return null;
  }
  return state.weatherData.current.weather[0].icon;
};

export const selectDescriptionIconHurly = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  // Прямое обращение к hourly и извлечение иконок
  return state.weatherData.hourly.map((item) => item.weather[0].icon);
};

export const selectHourlyData = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.dt);
};

export const selectHourlyTemp = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.temp);
};

export const selectHourlyTime = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.time);
};

export const selectTimezone = (state) => {
  if (!state.weatherData || !state.weatherData.timezone) {
    return null;
  }
  return state.weatherData.timezone;
};
export const selectCity = createSelector(
  (state) => state.city,
  (city) => city,
);

export const selectCities = createSelector(
  (state) => state.cities,
  (cities) => cities,
);
// export const selectDescriptionIcon = (state) => {
//   if (
//     !state.weatherData ||
//     !state.weatherData.current.weather[0] ||
//     !state.weatherData.current.weather[0].icon
//   ) {
//     return null;
//   }
//   return state.weatherData.current.weather[0].icon;
// };
export const selectCityNames = createSelector(
  (state) => state.weatherData?.current?.weather?.[0]?.name ?? null,
  (name) => name,
);

// export const selectCityNames = createSelector(
//   (state) => state.cities?.[0]?.name ?? null,
//   (name) => name,
// );

// export const selectCityNames = createSelector(
//   (state) => state.weatherData?.cities?.map((name) => name) ?? [],
//   (names) => names,
// );

// export const selectCityNames = createSelector(
//   (state) => state.weatherData?.cities?.map((city) => city.name) ?? [],
//   (names) => names,
// );

//   )

// );

// В вашем файле с селекторами или в том же файле, где определен ваш редьюсер
export const selectErrorMessage = (state: RootState) => {
  if (!state.weather || typeof state.weather.error !== 'string') {
    return null;
  }
  return state.weather.error;
};

export const selectTemperature = createSelector(
  (state) => state.weatherData,
  (state) => state.temperatureScale,
  (weatherData, temperatureScale) => {
    if (!weatherData || !weatherData.current) {
      return null;
    }

    const temp = weatherData.current.temp;
    return temperatureScale === 'C' ? temp : (temp * 9) / 5 + 32;
  },
);

export default weatherReducer;
