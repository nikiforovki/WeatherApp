import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  putWeatherData,
} from '../actions/actions'; // Убедитесь, что putWeatherData импортирован

// Предполагаем, что у вас есть действие SEARCH_WEATHER_DATA_REQUEST
// и оно передает location и weatherUnit в качестве части payload

function* workerWeatherData(payload) {
  try {
    const { lat, lon, weatherUnit } = payload.weatherInfo;
    const { data } = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${process.env.REACT_APP_API_KEY}`,
    );

    yield put(putWeatherData(data));
  } catch (error) {
    console.log(error);
    // Обработайте ошибку соответствующим образом
  }
}

function* workerGetWeatherDataBySearch(payload) {
  try {
    const { location, weatherUnit } = payload.location;
    const { data } = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${weatherUnit}&appid=${process.env.REACT_APP_API_KEY}`,
    );

    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const weatherDataCall = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${weatherUnit}&appid=${process.env.REACT_APP_API_KEY}`,
    );

    yield put(putWeatherData(weatherDataCall.data));
  } catch (error) {
    yield put(putWeatherData({}));
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
