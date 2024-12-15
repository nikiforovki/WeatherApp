import { createReducer, createSelector, createAction } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherRequest,
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchCityListSuccess,
  updateCity,
  toggleTemperatureScale,
  fetchWeatherDataByCityNameRequest,
  fetchWeatherDataByCityNameSuccess,
  fetchWeatherDataByCityNameFailure,
} from '../actions/actions';

interface WeatherState {
  weatherData: any | null; // Используйте конкретный тип вместо any
  error: string | null;
  city: string;
  temperatureScale: 'C' | 'F';
  currentTemperatureCelsius: number | null;
  currentTemperatureFahrenheit: number | null;
  cities: any[]; // Используйте конкретный тип вместо any
}

const initialState: WeatherState = {
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
      state.currentTemperatureFahrenheit = action.payload.current.temp;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload.message;
    })
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(toggleTemperatureScale, (state, action) => {
      state.temperatureScale = action.payload === 0 ? 'C' : 'F';
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
    });
});

export const selectFirstSixHours = (state: any) =>
  state.weather.weatherData?.current;

export const selectCurrentWeatherDetails = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.temp;
};

export const selectSunrise = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.sunrise;
};

export const selectSunset = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.sunset;
};

export const selectFeelsLike = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.feels_like;
};

export const selectPrecipitation = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.clouds;
};

export const selectPressure = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.pressure;
};

export const selectHumidity = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.humidity;
};

export const selectVisibility = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.visibility;
};

export const selectWindSpeed = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.current) {
    return null;
  }
  return state.weather.weatherData.current.wind_speed;
};

export const selectDescriptionIcon = (state: any) => {
  if (
    !state.weather.weatherData ||
    !state.weather.weatherData.current.weather[0] ||
    !state.weather.weatherData.current.weather[0].icon
  ) {
    return null;
  }
  return state.weather.weatherData.current.weather[0].icon;
};

export const selectDescriptionIconHurly = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.hourly) {
    return [];
  }
  return state.weather.weatherData.hourly.map(
    (item: any) => item.weather[0].icon,
  );
};

export const selectHourlyData = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.hourly) {
    return [];
  }
  return state.weather.weatherData.hourly.map((item: any) => item.dt);
};

export const selectHourlyTemp = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.hourly) {
    return [];
  }
  return state.weather.weatherData.hourly
    .map((item: any) => item.temp)
    .slice(0, 7);
};

export const selectHourlyTime = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.hourly) {
    return [];
  }
  return state.weather.weatherData.hourly.map((item: any) => item.time);
};

export const selectTimezone = (state: any) => {
  if (!state.weather.weatherData || !state.weather.weatherData.timezone) {
    return null;
  }
  return state.weather.weatherData.timezone;
};

export const selectCity = createSelector(
  (state: any) => state.weather.city,
  (city) => city,
);

export const selectCities = createSelector(
  (state: any) => state.weather.cities,
  (cities) => cities,
);

export const selectCityNames = createSelector(
  (state: any) => state.weather.cities?.map((city: any) => city.name) ?? [],
  (names) => names,
);

export const selectCityCountryName = createSelector(
  (state: any) => state.weather.cities?.map((city: any) => city.country) ?? [],
  (names) => names,
);

export const selectFirstCityCountryName = createSelector(
  (state: any) => state.weather.cities?.[0]?.country_name,
  (countryName) => countryName || null,
);

export const fetchCountryDataRequest = createAction(
  'currentweather/fetchCountryDataRequest',
  (countryName: string) => ({
    payload: countryName,
  }),
);

export const selectErrorMessage = (state: any) => {
  if (!state.weather || typeof state.weather.error !== 'string') {
    return null;
  }
  return state.weather.error;
};

export const selectTemperature = createSelector(
  (state: any) => state.weather.weatherData,
  (state: any) => state.weather.temperatureScale,
  (weatherData, temperatureScale) => {
    if (!weatherData || !weatherData.current) {
      return null;
    }
    const temp = weatherData.current.temp;
    return temperatureScale === 'C' ? temp : (temp * 9) / 5 + 32;
  },
);

export default weatherReducer;

//Работает
// import { createReducer, createSelector, createAction } from '@reduxjs/toolkit';
// import {
//   fetchCurrentWeatherRequest,
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
//   fetchCityListSuccess,
//   updateCity,
//   putWeatherData,
//   fetchWeatherDataByCityNameRequest,
//   fetchWeatherDataByCityNameSuccess,
//   fetchWeatherDataByCityNameFailure,
//   toggleTemperatureScale,
// } from '../actions/actions';

// type WeatherDataType = {};

// interface WeatherState {
//   weatherData: WeatherDataType | null;
//   error: string | null;
//   city: string;
//   temperatureScale: 'C' | 'F';
//   currentTemperatureCelsius: number | null;
//   currentTemperatureFahrenheit: number | null;
// }

// interface RootState {
//   weather: WeatherState;
//   count: number;
//   name: string;
// }

// const initialState = {
//   weatherData: null,
//   error: null,
//   city: '',
//   temperatureScale: 'C',
//   currentTemperatureCelsius: null,
//   currentTemperatureFahrenheit: null,
//   cities: [],
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
//       state.error = action.payload.message;
//     })
//     .addCase(updateCity, (state, action) => {
//       state.city = action.payload;
//     })
//     .addCase(putWeatherData, (state, action) => {
//       const { currentTemp, windSpeed, weatherUnit } = action.payload;
//       state.weatherData = action.payload;
//       state.currentTemperatureCelsius =
//         weatherUnit === 'metric' ? currentTemp : null;
//       state.currentTemperatureFahrenheit =
//         weatherUnit === 'imperial' ? currentTemp : null;
//       state.windSpeedMph = weatherUnit === 'imperial' ? windSpeed : null;
//       state.windSpeedMps = weatherUnit === 'metric' ? windSpeed : null;
//     })
//     .addCase(fetchWeatherDataByCityNameRequest, (state) => {
//       state.error = null;
//     })
//     .addCase(fetchWeatherDataByCityNameSuccess, (state, action) => {
//       state.weatherData = action.payload;
//       state.error = null;
//     })
//     .addCase(fetchWeatherDataByCityNameFailure, (state, action) => {
//       state.error = action.payload.message;
//     })
//     .addCase(fetchCityListSuccess, (state, action) => {
//       state.cities = action.payload;
//     })
//     .addCase(toggleTemperatureScale, (state) => {
//       const newScale = state.temperatureScale === 'C' ? 'F' : 'C';
//       state.temperatureScale = newScale;
//       if (newScale === 'F') {
//         state.currentTemperatureCelsius =
//           ((state.currentTemperatureCelsius - 32) * 5) / 9;
//       } else {
//         state.currentTemperatureFahrenheit =
//           (state.currentTemperatureCelsius * 9) / 5 + 32;
//       }
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
//     !state.weatherData.current.weather[0].icon
//   ) {
//     return null;
//   }
//   return state.weatherData.current.weather[0].icon;
// };

// export const selectDescriptionIconHurly = (state) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }

//   return state.weatherData.hourly.map((item) => item.weather[0].icon);
// };

// export const selectHourlyData = (state) => {
//   if (!state.weatherData || !state.weatherData.hourly) {
//     return [];
//   }
//   return state.weatherData.hourly.map((item) => item.dt);
// };

// export const selectHourlyTemp = (state) => {
//   console.log('с селектора выдает температуру в час', selectHourlyTemp);

//   if (!state.weatherData || !state.weatherData.hourly) {
//     console.log('с селектора выдает температуру в час', selectHourlyTemp);
//     return [];
//   }
//   console.log('с селектора выдает температуру в час', selectHourlyTemp);

//   const temps = state.weatherData.hourly.map((item) => item.temp);

//   return temps.slice(0, 7);
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

// export const selectCities = createSelector(
//   (state) => state.cities,
//   (cities) => cities,
// );

// export const selectCityNames = createSelector(
//   (state) => state.cities?.map((city) => city.name) ?? [],
//   (names) => names,
// );

// export const selectCityCountryName = createSelector(
//   (state) => state.cities?.map((city) => city.country) ?? [],
//   (names) => names,
// );

// export const selectFirstCityCountryName = createSelector(
//   (state) => state.cities?.[0]?.country_name,
//   (countryName) => countryName || null,
// );

// export const fetchCountryDataRequest = createAction(
//   'currentweather/fetchCountryDataRequest',
//   (countryName) => ({
//     payload: countryName,
//   }),
// );

// export const selectErrorMessage = (state: RootState) => {
//   if (!state.weather || typeof state.weather.error !== 'string') {
//     return null;
//   }
//   return state.weather.error;
// };

// export const selectTemperature = createSelector(
//   (state) => state.weatherData,
//   (state) => state.temperatureScale,
//   (weatherData, temperatureScale) => {
//     if (!weatherData || !weatherData.current) {
//       return null;
//     }

//     const temp = weatherData.current.temp;
//     return temperatureScale === 'C' ? temp : (temp * 9) / 5 + 32;
//   },
// );

// export default weatherReducer;
