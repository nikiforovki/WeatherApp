import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import GlobalStyles from '../GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import WeatherSkeleton from './components/Selecton/WeatherSkeleton';

const AppWrapper = styled.div`
  width: 1366px;
  height: 100%;
  max-width: 1366px;
  min-height: 100vh;
  background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
    0% no-repeat padding-box;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false); // Добавляем новое состояние для отслеживания наличия данных

  const handleApiError = (error) => {
    setApiError(error.message);
    setIsLoading(false);
    setHasData(false); // Устанавливаем флаг отсутствия данных в случае ошибки
  };

  const fetchData = async () => {
    try {
      // Здесь должен быть ваш код для загрузки данных
      // После успешной загрузки данных устанавливаем isLoading в false и hasData в true
      setIsLoading(false);
      setHasData(true);
    } catch (error) {
      handleApiError(error);
    }
  };

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
      <GlobalStyles />
      <AppWrapper>
        <WeatherHeader />
        <WeatherSummary />
        {isLoading ? (
          <WeatherSkeleton count={10} />
        ) : !hasData ? (
          <div>Данные по погоде отсутствуют</div> // Отображаем сообщение, если данных нет
        ) : (
          <WeatherForecastDetails />
        )}
      </AppWrapper>
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
