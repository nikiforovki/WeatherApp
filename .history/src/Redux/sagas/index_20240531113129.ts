import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchWeatherDataByCityNameFailure,
  fetchCityListRequest,
  putWeatherData,
} from '../actions/actions';

const API_KEY = process.env.REACT_APP_API_KEY;
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

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

function* workerWeatherData(payload) {
  console.log('Сага запущена');
  console.log('Новый город:', payload);
  try {
    const { lat, lon, weatherUnit } = payload.weatherInfo;
    const { data } = yield call(
      weatherApi.get,
      `onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${API_KEY}`,
    );
    yield put(putWeatherData(data));
  } catch (error) {
    console.log(error);
  }
}

function* workerGetWeatherDataBySearch(action) {
  console.log('Саги загружены');
  console.log('workerGetWeatherDataBySearch запущена с действием:', action);
  try {
    const { cityName, weatherUnit } = action.payload;
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
    yield put(putWeatherData(weatherResponse.data));
  } catch (error) {
    console.error('Ошибка в workerGetWeatherDataBySearch:', error);

    const errorMessage = error.message
      ? error.message
      : 'Не удалось получить данные о погоде';
    console.log('Подробное сообщение об ошибке:', errorMessage);

    if (error.response && error.response.status === 404) {
      console.log(`Город не найден Сага`);
      errorMessage = 'Город не найден';
    }

    yield put(fetchWeatherDataByCityNameFailure(errorMessage));
  }
}

// function* fetchCityList(action) {
//   try {
//     const response = yield call(
//       axios.get,
//       `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=10&appid=${API_KEY}`,
//     );
//     const cities = response.data;
//     yield put(fetchCityListSuccess(cities)); // Используйте fetchCityListSuccess напрямую
//   } catch (error) {
//     yield put(fetchCityListFailure(error.message)); // Используйте fetchCityListFailure напрямую
//   }
// }

export function* watchFetchCurrentWeather() {
  yield takeLatest('FETCH_CURRENT_WEATHER_REQUEST', fetchCurrentWeather);
}

export function* watchWorkerWeatherData() {
  yield takeLatest('WORKER_WEATHER_DATA_REQUEST', workerWeatherData);
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
    watchWorkerWeatherData(),
    watchWorkerGetWeatherDataBySearch(),
  ]);
}
