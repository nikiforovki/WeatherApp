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

export const putWeatherData = createAction<{
  currentTemp: number;
  windSpeed: number;
  weatherUnit?: 'metric' | 'imperial';
}>('PUT_WEATHER_DATA');

export const fetchWeatherDataByCityNameRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial'; // Уточнение типа weatherUnit
}>('FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST');
export const fetchWeatherDataByCityNameSuccess = createAction<any>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS',
);
export const fetchWeatherDataByCityNameFailure = createAction<string>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_FAILURE',
);

// Используем createAction для WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST
export const workerGetWeatherDataBySearchRequest = createAction<{
  cityName: string;
  weatherUnit: 'metric' | 'imperial';
}>('WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST');

// Обновление toggleTemperatureScale для более гибкой типизации
export const toggleTemperatureScale = createAction<{ value: unknown }>(
  'TOGGLE_TEMPERATURE_SCALE',
  (action) => ({
    ...action,
    payload: action.payload.value,
  }),
);
//Работает
// import { createAction } from '@reduxjs/toolkit';

// export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
//   'FETCH_CURRENT_WEATHER_REQUEST',
// );
// export const fetchCurrentWeatherSuccess = createAction<any>(
//   'FETCH_CURRENT_WEATHER_SUCCESS',
// );
// export const fetchCurrentWeatherFailure = createAction<{ message: string }>(
//   'FETCH_CURRENT_WEATHER_FAILURE',
// );

// export const updateCity = createAction<string>('UPDATE_CITY');

// export const updateCitiesList = createAction<string[]>('UPDATE_CITIES_LIST');

// export const fetchCityListRequest = createAction('FETCH_CITY_LIST_REQUEST');

// export const fetchCityListSuccess = createAction<any>(
//   'FETCH_CITY_LIST_SUCCESS',
// );
// export const fetchCityListFailure = createAction<{ message: string }>(
//   'FETCH_CITY_LIST_FAILURE',
// );

// export const putWeatherData = createAction<{
//   currentTemp: number;
//   windSpeed: number;
//   weatherUnit?: 'metric' | 'imperial';
// }>('PUT_WEATHER_DATA');

// export const fetchWeatherDataByCityNameRequest = createAction<{
//   cityName: string;
//   weatherUnit: string;
// }>('FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST');
// export const fetchWeatherDataByCityNameSuccess = createAction<any>(
//   'FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS',
// );
// export const fetchWeatherDataByCityNameFailure = createAction<string>(
//   'FETCH_WEATHER_DATA_BY_CITY_NAME_FAILURE',
// );
// export const WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST =
//   'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST';

// export const toggleTemperatureScale = createAction<number>({
//   type: 'TOGGLE_TEMPERATURE_SCALE',
//   payloadSelector: (action) => action.payload,
// });
