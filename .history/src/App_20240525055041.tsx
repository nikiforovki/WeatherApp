import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import GlobalStyles from '../ GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import WeatherSkeleton from './components/Selecton/WeatherSkeleton';

// const AppWrapper = styled.div`
//   width: 100%;
//   min-height: 1042px;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
//     0% no-repeat padding-box;
//
//   /* Стили для экранов меньше 375px */
//   @media (max-width: 375px) {
//     min-height: 2500px; /* Адаптируем минимальную высоту */
//   }
//
//   /* Стили для экранов от 375px до 768px */
//   @media (min-width: 375px) and (max-width: 768px) {
//     min-height: 2000px; /* Адаптируем минимальную высоту */
//   }
//
//   /* Стили для планшетов */
//   @media (min-width: 768px) and (max-width: 1365px) {
//     min-height: 1800px; /* Адаптируем минимальную высоту */
//   }
//
//   /* Стили для экранов от 1366px и выше */
//   @media (min-width: 1366px) {
//     width: 1366px;
//     height: 1042px;
//   }
//
//   /* Стили для очень больших экранов */
//   @media (min-width: 1920px) {
//     width: 100%;
//     min-height: 100vh; /* Адаптируем минимальную высоту */
//   }
// `;
const AppWrapper = styled.div`
  width: 100%;
  // min-width: 375px;
  max-width: 1366px;
  min-height: 100vh;
  background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
    0% no-repeat padding-box;
  background-size: cover;
  display: flex;
  flex-direction: column;

  /* Стили для экранов меньше 375px */
  @media (min-width: 375px) and (max-width: 760px) {
    min-height: 2000px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    min-height: 2000px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    min-height: 1500px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    min-height: 1040px;
  }
`;

//   /* Стили для планшетов */
//   @media (max-width: 768px) {
//     min-height: 2000px;
//   }
//   @media (max-width: 1024px) {
//     min-height: 2000px;
//   }
//
//   /* Стили для экранов от 1366px и выше */
//   @media (max-width: 1366px) {
//     height: 1042px;
//   }
//
//   /* Стили для очень больших экранов */
//   @media (max-width: 1920px) {
//     width: 100%;
//     min-height: 100vh;
//   }
//
// `;

const App = () => {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleApiError = (error) => {
    setApiError(error.message);
    setIsLoading(true);
  };

  const fetchData = async () => {
    try {
      // Здесь должен быть ваш код для загрузки данных
      // После успешной загрузки данных устанавливаем isLoading в false
      setIsLoading(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleLoadingChange = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  useEffect(() => {
    console.log('isLoading changed:', isLoading);
  }, [isLoading]);

  useEffect(() => {
    // Задаем задержку перед началом загрузки данных
    const timer = setTimeout(() => {
      fetchData();
    }, 3000); // Задержка в 2 секунды

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <GlobalStyles />
        <AppWrapper>
          <WeatherHeader />
          <WeatherSummary />
          {isLoading ? (
            <WeatherSkeleton count={10} />
          ) : (
            <WeatherForecastDetails />
          )}
        </AppWrapper>
      </ErrorBoundary>
      {apiError && <div>Ошибка: {apiError}</div>}
    </>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
// import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
// import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
// // import WeatherForecastDetails from './components/WeatherForecastDetails/WeatherForecastDetails';
// import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
// import GlobalStyles from '../ GlobalStyles';
// import 'react-loading-skeleton/dist/skeleton.css';
// import WeatherSkeleton from './components/Selecton/WeatherSkeleton';

// const AppWrapper = styled.div`
//   width: 100%;
//   min-width: 375px;
//   max-width: 1366px;
//   min-height: 100vh;
//   background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
//     0% no-repeat padding-box;
//   background-size: cover;
//   display: flex;
//   flex-direction: column;

//   @media (min-width: 375px) and (max-width: 760px) {
//     min-height: 2000px;
//   }
//   @media (min-width: 760px) and (max-width: 1024px) {
//     min-height: 2000px;
//   }
//   @media (min-width: 1024px) and (max-width: 1366px) {
//     min-height: 1500px;
//   }
//   @media (min-width: 1366px) and (max-width: 1920px) {
//     min-height: 1040px;
//   }
// `;

// const App = () => {
//   const [apiError, setApiError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleApiError = (error) => {
//     setApiError(error.message);
//     setIsLoading(true);
//   };

//   const fetchData = async () => {
//     try {
//       setIsLoading(false);
//     } catch (error) {
//       handleApiError(error);
//     }
//   };

//   const handleLoadingChange = (isLoading: boolean) => {
//     setIsLoading(isLoading);
//   };

//   useEffect(() => {
//     console.log('isLoading changed:', isLoading);
//   }, [isLoading]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchData();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <ErrorBoundary>
//         <GlobalStyles />
//         <AppWrapper>
//           <WeatherHeader />
//           <WeatherSummary />
//           {isLoading ? (
//             <WeatherSkeleton count={10} />
//           ) : (
//             <WeatherForecastDetails />
//           )}
//         </AppWrapper>
//       </ErrorBoundary>
//       {apiError && <div>Ошибка: {apiError}</div>}
//     </>
//   );
// };

// export default App;

// //www

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
// import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
// import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
// // import WeatherForecastDetails from './components/WeatherForecastDetails/WeatherForecastDetails';
// import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
// import GlobalStyles from '../ GlobalStyles';
// import 'react-loading-skeleton/dist/skeleton.css';
// import WeatherSkeleton from './components/Selecton/WeatherSkeleton';

// const AppWrapper = styled.div`
//   width: 100%;
//   min-width: 375px;
//   max-width: 1366px;
//   min-height: 100vh;
//   background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
//     0% no-repeat padding-box;
//   background-size: cover;
//   display: flex;
//   flex-direction: column;

//   @media (min-width: 375px) and (max-width: 760px) {
//     min-height: 2000px;
//   }
//   @media (min-width: 760px) and (max-width: 1024px) {
//     min-height: 2000px;
//   }
//   @media (min-width: 1024px) and (max-width: 1366px) {
//     min-height: 1500px;
//   }
//   // @media (min-width: 1366px) and (max-width: 1920px) {
//   //   min-height: 1040px;
//   // }
// `;

// const App = () => {
//   const [apiError, setApiError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleApiError = (error) => {
//     setApiError(error.message);
//     setIsLoading(true);
//   };

//   const fetchData = async () => {
//     try {
//       setIsLoading(false);
//     } catch (error) {
//       handleApiError(error);
//     }
//   };

//   const handleLoadingChange = (isLoading: boolean) => {
//     setIsLoading(isLoading);
//   };

//   useEffect(() => {
//     console.log('isLoading changed:', isLoading);
//   }, [isLoading]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchData();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <ErrorBoundary>
//         <GlobalStyles />
//         <AppWrapper>
//           <WeatherHeader />
//           <WeatherSummary />
//           {isLoading ? (
//             <WeatherSkeleton count={10} />
//           ) : (
//             <WeatherForecastDetails />
//           )}
//         </AppWrapper>
//       </ErrorBoundary>
//       {apiError && <div>Ошибка: {apiError}</div>}
//     </>
//   );
// };

// export default App;
