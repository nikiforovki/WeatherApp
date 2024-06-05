import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../slice/currentweatherSlice'; // Предполагается, что это файл, который объединяет все ваши редюсеры
import rootSaga from '../sagas/index'; // Предполагается, что это файл, который объединяет все ваши Saga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import { currentWeatherSlice } from '../slice/currentweatherSlice';
// import { watchFetchCurrentWeather } from '../sagas/index';
//
// const sagaMiddleware = createSagaMiddleware();
//
// const store = configureStore({
//   reducer: {
//     currentWeather: currentWeatherSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });
//
// sagaMiddleware.run(watchFetchCurrentWeather);
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export default store;

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
