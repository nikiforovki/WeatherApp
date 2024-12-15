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
    --primary-color: #20d1bc;
    --secondary-color: #20d1bc; 

   //  --primary-color: #1aade3;
   //  --secondary-color: #20d1bc; 
  }

  [data-theme='light'] {
  //  --primary-color: #1aade3; 
   --secondary-color: #1aade3;

   // --primary-color: #20d1bc; 
   // --secondary-color: #1aade3;
  }

 .App {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
   //  background-color: linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
