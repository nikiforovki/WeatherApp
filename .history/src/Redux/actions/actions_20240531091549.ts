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

export const FETCH_CITY_LIST_REQUEST = 'FETCH_CITY_LIST_REQUEST';
export const fetchCityListRequest = () => ({ type: FETCH_CITY_LIST_REQUEST });

export const FETCH_CITY_LIST_SUCCESS = 'FETCH_CITY_LIST_SUCCESS';
export const fetchCityListSuccess = (cities) => ({
  type: FETCH_CITY_LIST_SUCCESS,
  payload: cities,
});

export const FETCH_CITY_LIST_FAILURE = 'FETCH_CITY_LIST_FAILURE';
export const fetchCityListFailure = (error) => ({
  type: FETCH_CITY_LIST_FAILURE,
  payload: error,
});

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
const changeTemperatureScale = createAction('weather/changeTemperatureScale');

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
