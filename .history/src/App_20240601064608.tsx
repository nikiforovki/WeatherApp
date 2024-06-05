import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary'; // Убедитесь, что путь к ErrorBoundary верный
import GlobalStyles from './GlobalStyles'; // Убедитесь, что путь к GlobalStyles верный
import AppWrapper from './AppWrapper'; // Убедитесь, что путь к AppWrapper верный
import WeatherHeader from './WeatherHeader'; // Убедитесь, что путь к WeatherHeader верный
import WeatherSummary from './WeatherSummary'; // Убедитесь, что путь к WeatherSummary верный
import WeatherSkeleton from './WeatherSkeleton'; // Убедитесь, что путь к WeatherSkeleton верный
import WeatherForecastDetails from './WeatherForecastDetails'; // Убедитесь, что путь к WeatherForecastDetails верный

const App = () => {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleApiError = (error) => {
    setApiError(error.message);
    setIsLoading(true);
    throw error; // Выбрасываем ошибку, чтобы она могла быть отловлена ErrorBoundary
  };

  const fetchData = async () => {
    try {
      // Фиктивный запрос, который может завершиться ошибкой
      const response = await fetch('https://nonexistent-api.com/data');
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      setIsLoading(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData(); // Вызываем fetchData сразу при монтировании компонента
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <ErrorBoundary>
        <GlobalStyles />
        <AppWrapper
          theme={{
            primaryColor: theme === 'light' ? '#20d1bc' : '#1aade3',
            secondaryColor: theme === 'light' ? '#1aade3' : '#20d1bc',
          }}
        >
          <WeatherHeader />
          <WeatherSummary />
          {isLoading ? (
            <WeatherSkeleton count={10} />
          ) : (
            <WeatherForecastDetails />
          )}
        </AppWrapper>
        {apiError && <div>Ошибка: {apiError}</div>}
      </ErrorBoundary>
    </>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
// import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
// import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
// import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
// import GlobalStyles from '../GlobalStyles';
// import 'react-loading-skeleton/dist/skeleton.css';
// import WeatherSkeleton from './components/Selecton/WeatherSkeleton';
// import TodayWeatherContainer from './components/TodayWeatherContainer/TodayWeatherContainer';
// import { TemperatureScaleToggle } from './components/ToggleTemperatureScale/ToggleTemperatureScale';

// const AppWrapper = styled.div`
//   width: 1366px;
//   height: 100%;
//   max-width: 1366px;
//   min-height: 100vh;
//   background: ${({ theme }) =>
//     `linear-gradient(180deg, var(--${theme === 'light' ? 'primary-color' : 'secondary-color'}) 0%, var(--${theme === 'light' ? 'secondary-color' : 'primary-color'}) 100%) 0% 0% no-repeat padding-box`};
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
// `;

// const App = () => {
//   const [apiError, setApiError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [theme, setTheme] = useState('light');

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

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <>
//       <ErrorBoundary>
//         <GlobalStyles />
//         <AppWrapper
//           theme={{
//             primaryColor: theme === 'light' ? '#20d1bc' : '#1aade3',
//             secondaryColor: theme === 'light' ? '#1aade3' : '#20d1bc',
//           }}
//         >
//           <WeatherHeader />
//           <WeatherSummary />
//           {isLoading ? (
//             <WeatherSkeleton count={10} />
//           ) : (
//             <WeatherForecastDetails />
//           )}
//         </AppWrapper>
//         {/* <ErrorBoundary></ErrorBoundary> */}
//         {apiError && <div>Ошибка: {apiError}</div>}
//       </ErrorBoundary>
//     </>
//   );
// };

// export default App;
