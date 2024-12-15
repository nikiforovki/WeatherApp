import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Helvetica Neue';
    src: url('/HelveticaNeue-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }



  [data-theme='dark'] {



    --primary-color: #1aade3;
    --secondary-color: #20d1bc; 

    --weatherCardBackground: rgb(80, 80, 80); 


    --weatherCardline: rgb(0, 0, 0);

    --description-text-color: #ffffff99; 
    --value-text-color: #ffffff99; 


    //Блок с почасовым прогнозом


    --box-text-color: #FFFFFF99;
    --temperature-text-color: #FFFFFF99;

    //Блок Now
    --temperature-now-text-color: #FFFFFF99;
    --now-text-color: #FFFFFF99;

    



   //  --primary-color: #1aade3;
   //  --secondary-color: #20d1bc; 

   //Блок Today
   --temperature-today-text-color: #FFFFFF99;

   --dataToday-text-color: #FFFFFF99;

   --today-text-color: #FFFFFF99;

   --text-color-city: #FFFFFF99;

   
  }

  [data-theme='light'] {



   --primary-color: #20d1bc; 
   --secondary-color: #1aade3;

   --weatherCardBackground: rgb(255, 255, 255); 

   --weatherCardline: #FFFFFF;

   --description-text-color: #072A41; 

   --value-text-color: #072A41; 


   //Блок с почасовым прогнозом
   --box-text-color: #FFFFFF;
   --temperature-text-color: #FFFFFF;


   //Блок Today

   --temperature-today-text-color: #FFFFFF;
   --dataToday-text-color: #FFFFFF;
   --today-text-color: #FFFFFF;

   --text-color-city: #FFFFFF;


   //Блок Now
   --temperature-now-text-color: #FFFFFF;
   --now-text-color: #FFFFFF;



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
