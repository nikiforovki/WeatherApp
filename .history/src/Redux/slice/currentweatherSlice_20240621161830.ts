import { createReducer, createSelector, createAction } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchCityListSuccess,
  updateCity,
  putWeatherData,
  fetchWeatherDataByCityNameRequest,
  fetchWeatherDataByCityNameSuccess,
  fetchWeatherDataByCityNameFailure,
  toggleTemperatureScale,
} from '../actions/actions';

type WeatherDataType = {};

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
      state.cities = action.payload;
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

  return state.weatherData.hourly.map((item) => item.weather[0].icon);
};

export const selectHourlyData = (state) => {
  if (!state.weatherData || !state.weatherData.hourly) {
    return [];
  }
  return state.weatherData.hourly.map((item) => item.dt);
};

export const selectHourlyTemp = (state) => {
  console.log('selectHourlyTemp called');

  if (!state.weatherData || !state.weatherData.hourly) {
    console.log('No weather data available');
    return [];
  }

  // Извлекаем температуру из каждого элемента без преобразования
  const temps = state.weatherData.hourly.map((item) => item.temp);

  // Возвращаем только первые семь значений
  return temps.slice(0, 7);
};

// export const selectHourlyTemp = (state, temperatureScale) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }

//   // Извлекаем температуру из каждого элемента и преобразуем ее согласно выбранному шкале
//   return state.weatherData.hourly.map((item) => {
//     let temp = item.temp;
//     if (temperatureScale === 'F') {
//       temp = (temp * 9) / 5 + 32;
//     }
//     return temp;
//   });
// };

// export const selectHourlyTemp = (state, temperatureScale) => {
//   if (!state.weatherData ||!state.weatherData.hourly) {
//     return [];
//   }

//   // Проверяем, является ли weatherData.hourly массивом массивов
//   if (Array.isArray(state.weatherData.hourly) && state.weatherData.hourly.length > 0) {
//     // Извлекаем первый массив из списка
//     const firstArray = state.weatherData.hourly[0];

//     // Преобразуем каждое значение в этом массиве согласно выбранной шкале
//     return firstArray.map(item => {
//       let temp = item.temp;
//       if (temperatureScale === 'F') {
//         temp = (temp * 9) / 5 + 32;
//       }
//       return temp;
//     });
//   } else {
//     // Если weatherData.hourly не является массивом массивов, возвращаем пустой массив
//     return [];
//   }
// };

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

export const selectCityNames = createSelector(
  (state) => state.cities?.map((city) => city.name) ?? [],
  (names) => names,
);

export const selectCityCountryName = createSelector(
  (state) => state.cities?.map((city) => city.country) ?? [],
  (names) => names,
);

export const selectFirstCityCountryName = createSelector(
  (state) => state.cities?.[0]?.country_name,
  (countryName) => countryName || null,
);

export const fetchCountryDataRequest = createAction(
  'currentweather/fetchCountryDataRequest',
  (countryName) => ({
    payload: countryName,
  }),
);

export const selectErrorMessage = (state: RootState) => {
  if (!state.weather || typeof state.weather.error !== 'string') {
    return null;
  }
  return state.weather.error;
};

export const selectTemperature = createSelector(
  console.log('Temper11',selectTemperature )
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
