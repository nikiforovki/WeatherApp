import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'YourFontName';
    src: url('../public/helveticaneue-medium.otf') format('otf'),
         url('../public/helveticaneue-medium.otf') format('otf');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --header-background-color: #fdfdfd;
    --header-text-color: rgba(110, 108, 108, 0);

    --primary-color: #20d1bc; /* Цвет для светлой темы */
    --secondary-color: #1aade3; /* Цвет для светлой темы */

  }

  [data-theme='dark'] {
    --header-background-color: rgba(16, 16, 16, 0.86);
    --header-text-color: #ffffff;

    --primary-color: #1aade3; /* Цвет для темной темы */
    --secondary-color: #20d1bc; /* Цвет для темной темы */
;
  }

  [data-theme='light'] {
    --header-background-color: rgb(247, 247, 247);
    --header-text-color: #101010;

  }

 .App {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--app-background-color);
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
