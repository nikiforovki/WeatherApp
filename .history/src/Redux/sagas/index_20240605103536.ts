import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchWeatherDataByCityNameFailure,
  fetchCityListRequest,
  fetchCityListSuccess,
  fetchCityListFailure,
  putWeatherData,
} from '../actions/actions';

const API_KEY = process.env.REACT_APP_API_KEY;
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const AUTOCOMPLETE_API_URL = 'https://autocomplete.travelpayouts.com/places2';

function* fetchCurrentWeather(action) {
  console.log('fetchCurrentWeather запущена');
  try {
    const response = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/onecall?lat=55.751244&lon=37.618423&appid=${API_KEY}`,
    );
    yield put(fetchCurrentWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchCurrentWeatherFailure(error.message));
  }
}

function* workerGetWeatherDataBySearch(action) {
  console.log('workerGetWeatherDataBySearch запущена с действием:', action);
  try {
    const { cityName, weatherUnit } = action.payload;
    let temperature;

    const response = yield call(
      weatherApi.get,
      `weather?q=${cityName}&appid=${API_KEY}`,
    );

    const { lat, lon } = response.data.coord;
    const weatherResponse = yield call(
      weatherApi.get,
      `onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${API_KEY}`,
    );
    console.log('Данные о погоде:', weatherResponse.data);

    temperature = weatherResponse.data.current.temp;

    if (weatherUnit === 'metric') {
      console.log(`Текущая температура в градусах Цельсия: ${temperature}°C`);
    } else if (weatherUnit === 'imperial') {
      const temperatureInFahrenheit = ((temperature - 273.15) * 9) / 5 + 32;
      console.log(
        `Текущая температура в градусах Фаренгейта: ${temperatureInFahrenheit}°F`,
      );
    }

    yield put(
      putWeatherData({
        ...weatherResponse.data,
        current: { ...weatherResponse.data.current, temp: temperature },
      }),
    );
  } catch (error) {
    console.error('Ошибка в workerGetWeatherDataBySearch:', error);

    let errorMessage = 'Не удалось получить данные о погоде';
    if (error.response && error.response.status === 404) {
      console.log(`Город не найден Сага`);
      errorMessage = 'Город не найден';
    } else {
      errorMessage =
        error.message || 'Произошла ошибка при получении данных о погоде';
    }

    yield put(fetchWeatherDataByCityNameFailure({ message: errorMessage }));
  }
}

function* fetchCityList(action) {
  console.log('fetchCityList запущена с действием:', action);

  try {
    const response = yield call(
      axios.get,
      `${AUTOCOMPLETE_API_URL}?term=${encodeURIComponent(action.payload)}&locale=ru&types[]=city`,
    );

    console.log(response);

    if (response.data && response.data.length > 0) {
      yield put(fetchCityListSuccess(response.data));
    } else {
      yield put(fetchCityListFailure('Города не найдены'));
    }
  } catch (error) {
    yield put(fetchCityListFailure('Ошибка при получении списка городов'));
  }
}

function* handleInputChange(event) {
  const inputValue = event.target.value;
  yield put({ type: 'FETCH_CITY_LIST_REQUEST', payload: inputValue });
}

export function* watchFetchCityList() {
  yield takeLatest('FETCH_CITY_LIST_REQUEST', fetchCityList);
}

export function* watchFetchCurrentWeather() {
  yield takeLatest('FETCH_CURRENT_WEATHER_REQUEST', fetchCurrentWeather);
}

export function* watchWorkerGetWeatherDataBySearch() {
  yield takeLatest(
    'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
    workerGetWeatherDataBySearch,
  );
}

export default function* rootSaga() {
  yield all([
    watchFetchCurrentWeather(),
    watchWorkerGetWeatherDataBySearch(),
    watchFetchCityList(),
  ]);
}
