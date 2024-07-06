import { createAction } from '@reduxjs/toolkit';

export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
  'FETCH_CURRENT_WEATHER_REQUEST',
);
export const fetchCurrentWeatherSuccess = createAction<any>(
  'FETCH_CURRENT_WEATHER_SUCCESS',
);
export const fetchCurrentWeatherFailure = createAction<{ message: string }>(
  'FETCH_CURRENT_WEATHER_FAILURE',
);

export const updateCity = createAction<string>('UPDATE_CITY');

export const updateCitiesList = createAction<string[]>('UPDATE_CITIES_LIST');

export const fetchCityListRequest = createAction('FETCH_CITY_LIST_REQUEST');
export const fetchCityListSuccess = createAction<any>(
  'FETCH_CITY_LIST_SUCCESS',
);
export const fetchCityListFailure = createAction<{ message: string }>(
  'FETCH_CITY_LIST_FAILURE',
);

export const PUT_WEATHER_DATA = 'PUT_WEATHER_DATA';

export const putWeatherData = (data) => ({
  type: PUT_WEATHER_DATA,
  payload: data,
});
export const updateWeatherData = createAction<any>('weather/updateWeatherData');

export const fetchWeatherDataByCityNameRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial';
}>('FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST');
export const fetchWeatherDataByCityNameSuccess = createAction<any>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS',
);
export const fetchWeatherDataByCityNameFailure = createAction<string>(
  'FETCH_CITY_DATA_BY_CITY_NAME_FAILURE',
);

export const workerGetWeatherDataBySearchRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial';
}>('WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST');

export const toggleTemperatureScale = createAction<string>(
  'TOGGLE_TEMPERATURE_SCALE',
);
export const receiveMetricWeatherData = createAction(
  'weather/receiveMetricWeatherData',
  (data) => ({ payload: data }),
);
export const receiveImperialWeatherData = createAction(
  'weather/receiveImperialWeatherData',
  (data) => ({ payload: data }),
);
