// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
// import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
// import GlobalStyles from '../GlobalStyles';
// import 'react-loading-skeleton/dist/skeleton.css';
// import WeatherSkeleton from './components/Selecton/WeatherSkeleton';
// import { InputSearch } from './components/InputSearch/InputSearch';
// import { DefaultTheme } from 'styled-components';

// interface AppWrapperProps {
//   theme?: DefaultTheme; // Теперь TypeScript знает, что такое DefaultTheme
// }

// const AppWrapper = styled.div<AppWrapperProps>`
//   width: 1366px;
//   height: 100vh;
//   max-width: 1366px;
//   background: ${({ theme }) =>
//     `linear-gradient(180deg, var(--${theme.colors.primary || ''}) 0%, var(--${theme.colors.secondary || ''}) 100%) 0% 0% no-repeat padding-box`};
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
//   font-family: 'Helvetica Neue', sans-serif;
// `;

// const App = () => {
//   const [apiError, setApiError] = useState(null);
//   const [hasError, setHasError] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [theme, setTheme] = useState('light');

//   const handleApiError = (error) => {
//     setApiError(error.message);
//     setIsLoading(false);
//   };

//   const fetchData = async () => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
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
//     }, 1000);

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
//       <GlobalStyles />
//       <AppWrapper
//         theme={{
//           colors: {
//             primary: theme === 'light' ? '#20d1bc' : '#1aade3',
//             secondary: theme === 'light' ? '#1aade3' : '#20d1bc',
//           },
//         }}
//       >
//         <InputSearch />
//         <WeatherSummary />

//         {isLoading ? <WeatherSkeleton count={1} /> : <WeatherForecastDetails />}
//       </AppWrapper>
//     </>
//   );
// };

// export default App;

//работает
//Работает
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
// import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
// import GlobalStyles from '../GlobalStyles';
// import 'react-loading-skeleton/dist/skeleton.css';
// import WeatherSkeleton from './components/Selecton/WeatherSkeleton';
// import { InputSearch } from './components/InputSearch/InputSearch';

// const AppWrapper = styled.div`
//   width: 1366px;
//   height: 100vh;
//   max-width: 1366px;
//   background: ${({ theme }) =>
//     `linear-gradient(180deg, var(--${theme === 'light' ? 'primary-color' : 'secondary-color'}) 0%, var(--${theme === 'light' ? 'secondary-color' : 'primary-color'}) 100%) 0% 0% no-repeat padding-box`};
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
//   font-family: 'Helvetica Neue', sans-serif;
// `;

// const App = () => {
//   const [apiError, setApiError] = useState(null);
//   const [hasError, setHasError] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [theme, setTheme] = useState('light');

//   const handleApiError = (error) => {
//     setApiError(error.message);
//     setIsLoading(false);
//   };

//   const fetchData = async () => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
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
//     }, 1000);

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
//       <GlobalStyles />
//       <AppWrapper
//         theme={{
//           primaryColor: theme === 'light' ? '#20d1bc' : '#1aade3',
//           secondaryColor: theme === 'light' ? '#1aade3' : '#20d1bc',
//         }}
//       >
//         <InputSearch />
//         <WeatherSummary />

//         {isLoading ? <WeatherSkeleton count={1} /> : <WeatherForecastDetails />}
//       </AppWrapper>
//     </>
//   );
// };

// export default App;
