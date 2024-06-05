import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  putWeatherData,
} from '../actions/actions'; // Настройте путь импорта по мере необходимости

const API_KEY = process.env.REACT_APP_API_KEY; // Предполагается, что это установлено в ваших переменных окружения

// Общая функция для получения данных о погоде на основе конечной точки и параметров
function* fetchWeatherData(endpoint, params) {
  try {
    const response = yield call(
      axios.get,
      `${endpoint}?${new URLSearchParams(params)}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Ошибка при получении данных о погоде:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Переброс ошибки для обработки вызывающей стороне
  }
}

function* fetchCurrentWeather(action) {
  const endpoint = 'https://api.openweathermap.org/data/2.5/onecall';
  const params = new URLSearchParams({
    lat: '55.751244',
    lon: '37.618423',
    appid: API_KEY,
  });
  const weatherData = yield call(fetchWeatherData, endpoint, params);
  yield put(fetchCurrentWeatherSuccess(weatherData));
}

function* workerWeatherData(payload) {
  const { lat, lon, weatherUnit } = payload.weatherInfo;
  const endpoint = 'https://api.openweathermap.org/data/2.5/onecall';
  const params = new URLSearchParams({
    lat,
    lon,
    units: weatherUnit,
    appid: API_KEY,
  });
  const weatherData = yield call(fetchWeatherData, endpoint, params);
  yield put(putWeatherData(weatherData));
}

function* workerGetWeatherDataBySearch(payload) {
  const { location, weatherUnit } = payload.location;
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  const params = new URLSearchParams({
    q: location,
    units: weatherUnit,
    appid: API_KEY,
  });
  const weatherData = yield call(fetchWeatherData, endpoint, params);

  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;
  const oneCallEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';
  const oneCallParams = new URLSearchParams({
    lat,
    lon,
    units: weatherUnit,
    appid: API_KEY,
  });

  const oneCallResponse = yield call(
    fetchWeatherData,
    oneCallEndpoint,
    oneCallParams,
  );
  yield put(putWeatherData(oneCallResponse));
}

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
