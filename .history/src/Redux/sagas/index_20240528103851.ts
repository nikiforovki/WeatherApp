import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  putWeatherData,
  fetchWeatherDataByCityNameFailure,
} from '../actions/actions';

const API_KEY = process.env.REACT_APP_API_KEY;
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

// Функция для вызова API
function callApi(endpoint, params) {
  return weatherApi.get(`${endpoint}?${params}&appid=${API_KEY}`);
}

// Обновленные саги
function* fetchCurrentWeatherByCoordinates({ lat, lon }) {
  try {
    const { data } = yield call(callApi, 'onecall', `lat=${lat}&lon=${lon}`);
    yield put(fetchCurrentWeatherSuccess(data));
  } catch (error) {
    yield put(fetchCurrentWeatherFailure(error.message));
  }
}

function* workerGetWeatherDataBySearch(action) {
  try {
    const { cityName, weatherUnit } = action.payload;
    const { data: cityData } = yield call(
      weatherApi.get,
      `weather?q=${cityName}&appid=${API_KEY}`,
    );
    const { lat, lon } = cityData.coord;
    yield call(fetchCurrentWeatherByCoordinates, { lat, lon });
  } catch (error) {
    yield put(fetchWeatherDataByCityNameFailure(error.message));
  }
}

// Наблюдатели саг
export function* watchFetchCurrentWeatherByCoordinates() {
  // Предполагается, что координаты передаются в действии
  yield takeLatest(
    'FETCH_CURRENT_WEATHER_BY_COORDINATES_REQUEST',
    fetchCurrentWeatherByCoordinates,
  );
}

export function* watchWorkerGetWeatherDataBySearch() {
  yield takeLatest(
    'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
    workerGetWeatherDataBySearch,
  );
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchFetchCurrentWeatherByCoordinates(),
    watchWorkerGetWeatherDataBySearch(),
  ]);
}

// import { all, call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
// } from '../actions/actions';

// function* fetchCurrentWeather(action: any) {
//   try {
//     const response = yield call(
//       axios.get,
//       // `https://api.openweathermap.org/data/2.5/weather?q=${action.payload.city}&appid=${process.env.REACT_APP_API_KEY}`,
//       `https://api.openweathermap.org/data/2.5/onecall?lat=55.751244&lon=37.618423&appid=${process.env.REACT_APP_API_KEY}`,
//       // `https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${process.env.REACT_APP_API_KEY}}`,
//     );
//     yield put(fetchCurrentWeatherSuccess(response.data));
//   } catch (error) {
//     console.error(
//       'Fetch current weather failed:',
//       error.response ? error.response.data : error.message,
//     );
//     yield put(
//       fetchCurrentWeatherFailure(
//         error.response ? error.response.data : error.message,
//       ),
//     );
//   }
// }

// export function* watchFetchCurrentWeather() {
//   yield takeLatest('FETCH_CURRENT_WEATHER_REQUEST', fetchCurrentWeather);
// }

// export default function* rootSaga() {
//   yield all([watchFetchCurrentWeather()]);
// }
