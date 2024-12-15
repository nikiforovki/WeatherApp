import { createAction } from '@reduxjs/toolkit';

// Комментарии к действиям улучшают понимание их назначения
export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
  'weather/FETCH_CURRENT_WEATHER_REQUEST', // Добавлено префикс 'weather/' для лучшей организации
);

export const fetchCurrentWeatherSuccess = createAction<{
  weatherData: any; // Замените 'any' на более конкретный тип, если известен
  error: null;
}>('weather/FETCH_CURRENT_WEATHER_SUCCESS');

export const fetchCurrentWeatherFailure = createAction<{
  error: { message: string };
}>('weather/FETCH_CURRENT_WEATHER_FAILURE');

export const updateCity = createAction<string>('weather/UPDATE_CITY');

export const updateCitiesList = createAction<string[]>(
  'weather/UPDATE_CITIES_LIST',
);

export const fetchCityListRequest = createAction(
  'weather/FETCH_CITY_LIST_REQUEST',
);
export const fetchCityListSuccess = createAction<{
  cities: any[]; // Замените 'any' на более конкретный тип, если известен
  error: null;
}>('weather/FETCH_CITY_LIST_SUCCESS');

export const fetchCityListFailure = createAction<{
  error: { message: string };
}>('weather/FETCH_CITY_LIST_FAILURE');

export const putWeatherData = createAction<{
  currentTemp: number;
  windSpeed: number;
  weatherUnit?: 'metric' | 'imperial'; // Опциональное поле weatherUnit
}>('weather/PUT_WEATHER_DATA');

export const fetchWeatherDataByCityNameRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial';
}>('weather/FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST');

export const fetchWeatherDataByCityNameSuccess = createAction<{
  weatherData: any; // Замените 'any' на более конкретный тип, если известен
  error: null;
}>('weather/FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS');

export const fetchWeatherDataByCityNameFailure = createAction<{
  error: string;
}>('weather/FETCH_CITY_DATA_BY_CITY_NAME_FAILURE'); // Исправлено название действия для согласованности

export const workerGetWeatherDataBySearchRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial';
}>('weather/WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST');

export const toggleTemperatureScale = createAction<{
  value: 'C' | 'F'; // Уточнение типа для value
}>('weather/TOGGLE_TEMPERATURE_SCALE');
