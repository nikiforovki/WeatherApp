import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import store from './Redux/store/store';

export const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        width: 100%;
        font-family: 'Arial', sans-serif;
        background-color: #f0f0f0; // Пример фонового цвета
        color: #333; // Пример цвета текста
    }

    body.no-scroll {
        overflow: hidden;
    }

    :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        // Другие переменные
    }
`;

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
);
