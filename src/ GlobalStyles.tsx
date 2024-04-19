import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 @font-face {
    font-family: 'YourFontName';
    src: url('../public/helveticaneue-medium.otf') format('otf'),
         url('../public/helveticaneue-medium.otf') format('otf');
    font-weight: normal;
    font-style: normal;
 }

 body {
    font-family: 'Helvetica', sans-serif;
 }
`;

export default GlobalStyles;
