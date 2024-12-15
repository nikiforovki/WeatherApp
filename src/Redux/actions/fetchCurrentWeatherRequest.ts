export const fetchCurrentWeatherRequest = (city) => {
  return {
    type: 'FETCH_CURRENT_WEATHER_REQUEST',
    payload: { city },
  };
};

export const putWeatherData = (city) => {
  return {
    type: 'FETCH_CURRENT_WEATHER_REQUEST',
    payload: { city },
  };
};
