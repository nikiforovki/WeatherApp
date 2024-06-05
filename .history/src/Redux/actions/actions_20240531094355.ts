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

export const updateCity = createAction<string>('UPDATE_CITY');

export const updateCitiesList = createAction<string[]>('UPDATE_CITIES_LIST');

export const putWeatherData = createAction<any>('PUT_WEATHER_DATA');

export const fetchWeatherDataByCityNameRequest = createAction<{
  cityName: string;
  weatherUnit: string;
}>('FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST');
export const fetchWeatherDataByCityNameSuccess = createAction<any>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS',
);
export const fetchWeatherDataByCityNameFailure = createAction<string>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_FAILURE',
);
export const WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST =
  'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST';

export const toggleTemperatureScale = createAction<number>(
  'weather/toggleTemperatureScale',
);

export const fetchCityListRequest = createAction('FETCH_CITY_LIST_REQUEST');

export const fetchCityListSuccess = createAction(
  'weather/fetchCityListSuccess',
  (payload) => ({
    payload,
  }),
);
export const fetchCityListFailure = createAction(
  'weather/fetchCityListFailure',
  (error) => ({
    payload: error,
  }),
);

// import { createAction } from '@reduxjs/toolkit';

// export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
//   'FETCH_CURRENT_WEATHER_REQUEST',
// );
// export const fetchCurrentWeatherSuccess = createAction<any>(
//   'FETCH_CURRENT_WEATHER_SUCCESS',
// );
// export const fetchCurrentWeatherFailure = createAction<string>(
//   'FETCH_CURRENT_WEATHER_FAILURE',
// );

// export const updateCity = createAction<string>('UPDATE_CITY');

// export const updateCitiesList = createAction<string[]>('UPDATE_CITIES_LIST');

// export const putWeatherData = createAction<any>('PUT_WEATHER_DATA');

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
