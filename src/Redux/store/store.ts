import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { currentWeatherSlice } from '../slice/currentweatherSlice';
import { watchFetchCurrentWeather } from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    currentWeather: currentWeatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchCurrentWeather);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import { watchFetchCurrentWeather } from '../sagas/index';
// import currentWeatherReducer from '../slice/currentweatherSlice';
//
// const sagaMiddleware = createSagaMiddleware();
//
// const store = configureStore({
//   reducer: {
//     currentWeather: currentWeatherReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });
//
// sagaMiddleware.run(watchFetchCurrentWeather);
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = typeof store;
// export type AppDispatch = AppStore['dispatch'];
