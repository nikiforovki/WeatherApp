import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherError,
} from '../slice/currentweatherSlice';

function* fetchCurrentWeather(action) {
  try {
    const response = yield call(
      axios.get,
      `https://api.example.com/weather?city=${action.payload}`,
    );
    yield put(fetchCurrentWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchCurrentWeatherError(error.message));
  }
}

export function* watchFetchCurrentWeather() {
  yield takeLatest('currentWeather/fetchCurrentWeather', fetchCurrentWeather);
}

// // sagas/currentWeatherSaga.ts
// import { takeLatest, put } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherError,
// } from '../slice/currentweatherSlice';
// import { Weather } from '../types/types';
// import * as process from 'process';
//
// function* fetchCurrentWeatherSaga(
//   action: ReturnType<typeof fetchCurrentWeather>,
// ) {
//   try {
//     const response = yield axios.get<Weather>(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${action.payload.latitude}&lon=${action.payload.longitude}&appid=${process.env.REACT_APP_API_KEY}`,
//     );
//     yield put(fetchCurrentWeatherSuccess(response.data));
//   } catch (error) {
//     yield put(fetchCurrentWeatherError(error.response));
//   }
// }
//
// export function* watchFetchCurrentWeather() {
//   yield takeLatest(
//     'current_weather/fetchCurrentWeather',
//     fetchCurrentWeatherSaga,
//   );
// }
