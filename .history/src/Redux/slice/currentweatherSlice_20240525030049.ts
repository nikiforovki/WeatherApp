import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
} from '../actions/actions';

const initialState = {
  weatherData: null,
  error: null,
};

const weatherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCurrentWeatherSuccess, (state, action) => {
      state.weatherData = action.payload;
      state.error = null;
    })
    .addCase(fetchCurrentWeatherFailure, (state, action) => {
      state.error = action.payload;
    });
});
// export const selectFirstSixHours = (state) =>
//   state.weather?.weatherData?.hourly?.slice(0, 6) ?? null;

export const selectFirstSixHours = (state) => state.weatherData;

export const selectCurrentWeatherDetails = (state) => state.weatherData;
export const selectSunrise = (state) => state.weatherData.sys.sunrise;
export const selectSunset = (state) => state.weatherData.sys.sunset;
export const selectFeelsLike = (state) => state.weatherData.main.feels_like;
export const selectPressure = (state) => state.weatherData.main.pressure;
export const selectHumidity = (state) => state.weatherData.main.humidity;
export const selectVisibility = (state) => state.weatherData.visibility;
export const selectWindSpeed = (state) => state.weatherData.wind.speed;
export const selectDescriptionIcon = (state) => {
  if (!state.weatherData || !state.weatherData.weather) {
    return null;
  }
  return state.weatherData.weather[0].description;
};


export default weatherReducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Weather } from '../types/types';
// import { AxiosResponse } from 'axios';
//
// type CurrentWeather = {
//   weather: Weather;
//   isLoading: boolean;
//   response: Response;
// };
//
// type Response = {
//   status: number;
//   message: string;
// };
//
// const initialState: CurrentWeather = {
//   weather: {
//     coord: { lon: 0, lat: 0 },
//     weather: [],
//     base: '',
//     main: {
//       temp: 0,
//       feels_like: 0,
//       temp_min: 0,
//       temp_max: 0,
//       pressure: 0,
//       humidity: 0,
//     },
//     visibility: 0,
//     wind: {
//       speed: 0,
//       deg: 0,
//       gust: 0,
//     },
//     clouds: {
//       all: 0,
//     },
//     dt: 0,
//     sys: {
//       type: 0,
//       id: 0,
//       country: '',
//       sunrise: 0,
//       sunset: 0,
//     },
//     timezone: 0,
//     id: 0,
//     name: '',
//     cod: 0,
//   },
//   isLoading: false,
//   response: {
//     status: 0,
//     message: '',
//   },
// };
//
// export const currentWeatherSlice = createSlice({
//   name: 'current_weather',
//   initialState,
//   reducers: {
//     fetchCurrentWeather(state) {
//       state.isLoading = true;
//     },
//     fetchCurrentWeatherSuccess(
//       state,
//       action: PayloadAction<AxiosResponse<Weather>>,
//     ) {
//       console.log('Data from API:', action.payload.data);
//       state.weather = action.payload.data;
//       state.isLoading = false;
//       state.response = {
//         status: action.payload.status,
//         message: action.payload.statusText,
//       };
//     },
//     fetchCurrentWeatherError(
//       state,
//       action: PayloadAction<AxiosResponse<Weather>>,
//     ) {
//       console.log('Error from API:', action.payload);
//       state.isLoading = false;
//       state.response = {
//         status: action.payload.status,
//         message: action.payload.statusText,
//       };
//     },
//   },
// });
//
// // Экспорт редуктора
// export const { actions, reducer: currentWeatherSliceReducer } =
//   currentWeatherSlice;
//
// // Исправленный экспорт действий
// export const {
//   fetchCurrentWeather,
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherError,
// } = currentWeatherSlice.actions;
//
// export default currentWeatherSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// interface ForecastItem {
//   id: number;
//   title: string;
//   image: JSX.Element;
//   sunriseTime?: string;
//   sunsetTime?: string;
//   humidity?: string;
//   wind?: string;
//   pressure?: string;
//   feelsLike?: string;
//   visibility?: string;
// }
//
// interface WeatherState {
//   forecastData: ForecastItem[];
// }
//
// const initialState: WeatherState = {
//   forecastData: [],
// };
//
// const weatherSlice = createSlice({
//   name: 'weather',
//   initialState,
//   reducers: {
//     setForecastData: (state, action: PayloadAction<ForecastItem[]>) => {
//       state.forecastData = action.payload;
//     },
//   },
// });
//
// export const { setForecastData } = weatherSlice.actions;
//
// export default weatherSlice;
