// import { all, call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   fetchCurrentWeatherSuccess,
//   fetchCurrentWeatherFailure,
//   fetchWeatherDataByCityNameFailure,
//   fetchCityListSuccess,
//   fetchCityListFailure,
//   putWeatherData,
//   receiveMetricWeatherData,
//   receiveImperialWeatherData,
// } from '../actions/actions';

// const API_KEY = process.env.REACT_APP_API_KEY;
// const weatherApi = axios.create({
//   baseURL: process.env.REACT_APP_WEATHER_API_BASE_URL,
// });

// const AUTOCOMPLETE_API_URL = process.env.REACT_APP_AUTOCOMPLETE_API_URL;

// function* fetchCurrentWeather(action) {
//   try {
//     const response = yield call(
//       axios.get,
//       `${process.env.REACT_APP_API_URL}?lat=55.751244&lon=37.618423&appid=${API_KEY}`,
//     );
//     yield put(fetchCurrentWeatherSuccess(response.data));
//   } catch (error) {
//     yield put(fetchCurrentWeatherFailure(error.message));
//   }
// }

// function* workerGetWeatherDataBySearch(action) {
//   try {
//     const { cityName } = action.payload;

//     // Получаем координаты города
//     const response = yield call(
//       weatherApi.get,
//       `weather?q=${cityName}&appid=${API_KEY}`,
//     );

//     const { lat, lon } = response.data.coord;

//     // Получаем данные о погоде в метрической системе
//     const metricResponse = yield call(
//       weatherApi.get,
//       `onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
//     );

//     console.log('Metric response:', metricResponse);

//     // Получаем данные о погоде в имперской системе
//     const imperialResponse = yield call(
//       weatherApi.get,
//       `onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`,
//     );

//     console.log('Imperial response:', imperialResponse);

//     const temperatureCelsius = metricResponse.data.current.temp;
//     const temperatureFahrenheit = imperialResponse.data.current.temp;

//     yield put(
//       putWeatherData({
//         ...metricResponse.data,
//         current: {
//           ...metricResponse.data.current,
//           tempCelsius: temperatureCelsius,
//           tempFahrenheit: temperatureFahrenheit,
//         },
//       }),
//     );
//   } catch (error) {
//     console.error('Ошибка в workerGetWeatherDataBySearch:', error);

//     let errorMessage = 'Не удалось получить данные о погоде';
//     if (error.response && error.response.status === 404) {
//       errorMessage = 'Город не найден';
//     } else {
//       errorMessage =
//         error.message || 'Произошла ошибка при получении данных о погоде';
//     }

//     yield put(fetchWeatherDataByCityNameFailure({ message: errorMessage }));
//   }
// }

// function* fetchWeatherDataSaga(action) {
//   try {
//     const { lat, lon } = action.payload;

//     // Получаем данные о погоде в метрической системе
//     const metricResponse = yield call(
//       weatherApi.get,
//       `onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
//     );

//     // Получаем данные о погоде в имперской системе
//     const imperialResponse = yield call(
//       weatherApi.get,
//       `onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`,
//     );

//     // Отправляем данные в стор
//     yield put(receiveMetricWeatherData(metricResponse.data));
//     yield put(receiveImperialWeatherData(imperialResponse.data));
//   } catch (error) {
//     console.error('Ошибка в fetchWeatherDataSaga:', error);
//     // Обработка ошибок
//   }
// }

// function* fetchCityList(action) {
//   try {
//     const response = yield call(
//       axios.get,
//       `${AUTOCOMPLETE_API_URL}?term=${encodeURIComponent(action.payload)}&locale=en&types[]=city`,
//     );

//     if (response.data && response.data.length > 0) {
//       yield put(fetchCityListSuccess(response.data));
//     } else {
//       yield put(fetchCityListFailure('Города не найдены'));
//     }
//   } catch (error) {
//     yield put(fetchCityListFailure('Ошибка при получении списка городов'));
//   }
// }

// function* handleInputChange(event) {
//   const inputValue = event.target.value;
//   yield put({ type: 'FETCH_CITY_LIST_REQUEST', payload: inputValue });
// }

// export function* watchFetchCityList() {
//   yield takeLatest('FETCH_CITY_LIST_REQUEST', fetchCityList);
// }

// export function* watchFetchCurrentWeather() {
//   yield takeLatest('FETCH_CURRENT_WEATHER_REQUEST', fetchCurrentWeather);
// }

// export function* watchWorkerGetWeatherDataBySearch() {
//   yield takeLatest(
//     'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
//     workerGetWeatherDataBySearch,
//   );
// }

// export default function* rootSaga() {
//   yield all([
//     watchFetchCurrentWeather(),
//     watchWorkerGetWeatherDataBySearch(),
//     watchFetchCityList(),
//   ]);
// }

//Работает
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCurrentWeatherSuccess,
  fetchCurrentWeatherFailure,
  fetchWeatherDataByCityNameFailure,
  fetchCityListSuccess,
  fetchCityListFailure,
  putWeatherData,
} from '../actions/actions';

const API_KEY = process.env.REACT_APP_API_KEY;
const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_BASE_URL,
});

const AUTOCOMPLETE_API_URL = process.env.REACT_APP_AUTOCOMPLETE_API_URL;

function* fetchCurrentWeather(action) {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_API_URL}?lat=55.751244&lon=37.618423&appid=${API_KEY}`,
    );
    yield put(fetchCurrentWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchCurrentWeatherFailure(error.message));
  }
}

function* workerGetWeatherDataBySearch(action) {
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

    temperature = weatherResponse.data.current.temp;

    if (weatherUnit === 'metric') {
    } else if (weatherUnit === 'imperial') {
      const temperatureInFahrenheit = ((temperature - 273.15) * 9) / 5 + 32;
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
      errorMessage = 'Город не найден';
    } else {
      errorMessage =
        error.message || 'Произошла ошибка при получении данных о погоде';
    }

    yield put(fetchWeatherDataByCityNameFailure({ message: errorMessage }));
  }
}

function* fetchCityList(action) {
  try {
    const response = yield call(
      axios.get,
      `${AUTOCOMPLETE_API_URL}?term=${encodeURIComponent(action.payload)}&locale=en&types[]=city`,
    );

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
