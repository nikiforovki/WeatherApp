import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 @font-face {
    font-family: 'YourFontName';
    src: url('../public/helveticaneue-medium.otf') format('otf'),
         url('../public/helveticaneue-medium.otf') format('otf');
    font-weight: normal;
    font-style: normal;
 }

 html, body {
     height: 100%;
     margin: 0;
     padding: 0;
    font-family: 'Helvetica', sans-serif;
 }
`;

export default GlobalStyles;
