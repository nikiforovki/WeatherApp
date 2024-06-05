import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
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
  console.log('workerGetWeatherDataBySearch запущена с действием:', action);
  try {
    const { cityName, weatherUnit } = action.payload;

    // Запрос к API для проверки наличия города
    const cityResponse = yield call(
      weatherApi.get,
      `weather?q=${cityName}&appid=${API_KEY}`,
    );

    // Проверка статуса ответа на наличие города
    if (cityResponse.data.cod === '404') {
      throw new Error('Город не найден');
    }

    const { lat, lon } = cityResponse.data.coord;

    // Запрос на получение данных о погоде, если город найден
    const weatherResponse = yield call(
      weatherApi.get,
      `onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${API_KEY}`,
    );

    console.log('Данные о погоде:', weatherResponse.data);
    yield put(putWeatherData(weatherResponse.data));
  } catch (error) {
    console.log(error);
    // Обработка ошибки, например, отправка действия с ошибкой
    yield put(fetchWeatherDataByCityNameFailure(error.message));
  }
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
