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
    --primary-color: #1aade3;
    --secondary-color: #20d1bc; 

    --weatherCardBackground: rgb(80, 80, 80); // Серый фон для темной темы


    --weatherCardline: rgb(0, 0, 0);

    --description-text-color: #ffffff; 
    --value-text-color: #ffffff; 


    //Блок с почасовым прогнозом


    --box-text-color: #FFFFFF;
    --temperature-text-color: #FFFFFF;

    //Блок Now
    --temperature-now-text-color: #FFFFFF;
    --now-text-color: #FFFFFF;

    



   //  --primary-color: #1aade3;
   //  --secondary-color: #20d1bc; 

   //Блок Today
   --temperature-today-text-color: #FFFFFF;

   --dataToday-text-color: #FFFFFF;

   --today-text-color: #FFFFFF;

   --text-color-city: #FFFFFF;

   
  }

  [data-theme='light'] {
   --primary-color: #20d1bc; 
   --secondary-color: #1aade3;

   --weatherCardBackground: rgb(255, 255, 255); 

   --weatherCardline: rgb(255, 255, 255);

   --description-text-color: #6e6c6c; 

   --value-text-color: #6e6c6c; 


   //Блок с почасовым прогнозом

   --box-text-color: #000000;
   --temperature-text-color: #FFFFFF99;


   //Блок Today

   --temperature-today-text-color: #000000;
   --dataToday-text-color: #000000;
   --today-text-color: #000000;

   --text-color-city: #000000;


   //Блок Now
   --temperature-now-text-color: #000000;
   --now-text-color: #FFFFFF99;



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
