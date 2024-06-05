// actions.ts
import { createAction } from '@reduxjs/toolkit';

export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
  'FETCH_CURRENT_WEATHER_REQUEST',
);
export const fetchCurrentWeatherSuccess = createAction<any>(
  'FETCH_CURRENT_WEATHER_SUCCESS',
);
export const fetchCurrentWeatherFailure = createAction<string>(
  'FETCH_CURRENT_WEATHER_FAILURE',
);
export const updateCityAndTimezone = createAction<{
  city: string;
  timezone: string;
}>('UPDATE_CITY_AND_TIMEZONE');

// const FETCH_WEATHER = 'FETCH_WEATHER';
// const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
// const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
//
// interface FetchWeatherAction {
//   type: typeof FETCH_WEATHER;
// }
//
// interface FetchWeatherSuccessAction {
//   type: typeof FETCH_WEATHER_SUCCESS;
//   payload: WeatherData;
// }
//
// interface FetchWeatherFailureAction {
//   type: typeof FETCH_WEATHER_FAILURE;
//   payload: string;
// }
//
// type WeatherActionTypes =
//   | FetchWeatherAction
//   | FetchWeatherSuccessAction
//   | FetchWeatherFailureAction;
