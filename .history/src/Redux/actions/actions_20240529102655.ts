import { createAction } from '@reduxjs/toolkit';

// Действия для запроса, успеха и неудачи текущей погоды
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
// Действие для обновления списка городов
export const updateCitiesList = createAction<string[]>('UPDATE_CITIES_LIST');

// Действие для обновления данных о погоде
export const putWeatherData = createAction<any>('PUT_WEATHER_DATA');

// Действия для запроса, успеха и неудачи погоды по названию города
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

export const WORKER_GET_WEATHER_DATA_BY_SEARCH_FAILURE =
  'WORKER_GET_WEATHER_DATA_BY_SEARCH_FAILURE';

// Действия для запроса, успеха и неудачи текущей погоды
export const fetchCurrentWeatherRequest = createAsyncThunk(
  'weather/fetchCurrentWeatherRequest',
  async ({ city }, { rejectWithValue }) => {
    try {
      const response = await fetch(`your_api_endpoint?city=${city}`);
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message === 'Город не найден') {
        return rejectWithValue({ message: 'Город не найден' });
      }
      throw error;
    }
  },
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

// export const putWeatherData = (data) => ({
//   type: 'PUT_WEATHER_DATA',
//   payload: data,
// });
