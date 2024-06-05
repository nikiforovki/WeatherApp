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



  }

  [data-theme='dark'] {
    --header-background-color: rgba(16, 16, 16, 0.86);
    --header-text-color: #ffffff;
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
