import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'YourFontName';
    src: url('../public/helveticaneue-medium.otf') format('otf'),
         url('../public/helveticaneue-medium.otf') format('otf');
    font-weight: normal;
    font-style: normal;
  }



  [data-theme='dark'] {
    --secondary-color: #20d1bc; /* Зеленый для темной темы */
  }

  [data-theme='light'] {
    --secondary-color: #1aade3; /* Оранжевый для светлой темы */
  }



  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
