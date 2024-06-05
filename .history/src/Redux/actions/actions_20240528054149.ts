import { createAction } from '@reduxjs/toolkit';

export const fetchCurrentWeatherRequest = createAction<{ city: string }>(
  'FETCH_CURRENT_WEATHER_REQUEST',
  (payload) => {
    console.log(
      `Sending FETCH_CURRENT_WEATHER_REQUEST for city: ${payload.city}`,
    );
    return payload;
  },
);
export const fetchCurrentWeatherSuccess = createAction<any>(
  'FETCH_CURRENT_WEATHER_SUCCESS',
  (payload) => {
    console.log('Received FETCH_CURRENT_WEATHER_SUCCESS');
    return payload;
  },
);
export const fetchCurrentWeatherFailure = createAction<string>(
  'FETCH_CURRENT_WEATHER_FAILURE',
  (error) => {
    console.log(
      `Received FETCH_CURRENT_WEATHER_FAILURE with message: ${error}`,
    );
    return error;
  },
);
export const updateCity = createAction<string>('UPDATE_CITY', (newCity) => {
  console.log(`Updating city to: ${newCity}`);
  return newCity;
});

export const putWeatherData = createAction<any>('PUT_WEATHER_DATA', (data) => {
  console.log('Putting weather data:', data);
  return data;
});

export const fetchWeatherDataByCityNameRequest = createAction<{
  cityName: string;
  weatherUnit: string;
}>('FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST', ({ cityName, weatherUnit }) => {
  console.log(
    `Sending FETCH_WEATHER_DATA_BY_CITY_NAME_REQUEST for city: ${cityName}, unit: ${weatherUnit}`,
  );
  return { cityName, weatherUnit };
});
export const fetchWeatherDataByCityNameSuccess = createAction<any>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS',
  (data) => {
    console.log('Received FETCH_WEATHER_DATA_BY_CITY_NAME_SUCCESS');
    return data;
  },
);
export const fetchWeatherDataByCityNameFailure = createAction<string>(
  'FETCH_WEATHER_DATA_BY_CITY_NAME_FAILURE',
  (error) => {
    console.log(
      `Received FETCH_WEATHER_DATA_BY_CITY_NAME_FAILURE with message: ${error}`,
    );
    return error;
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
