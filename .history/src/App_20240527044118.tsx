import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import GlobalStyles from '../GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import WeatherSkeleton from './components/Selecton/WeatherSkeleton';
import TodayWeatherContainer from './components/TodayWeatherContainer/TodayWeatherContainer';
import ToggleTheme from './components/ToggleTheme/ToggleTheme';

const AppWrapper = styled.div`
  width: 1366px;
  height: 100%;
  // min-width: 375px;
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
  const [theme, setTheme] = useState('light');

  const handleApiError = (error) => {
    setApiError(error.message);
    setIsLoading(true);
  };

  const fetchData = async () => {
    try {
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
    const timer = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      {/* <ErrorBoundary> */}
      <GlobalStyles />
      <AppWrapper theme={theme}>
        <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
        <WeatherHeader />
        <WeatherSummary />
        {isLoading ? (
          <WeatherSkeleton count={10} />
        ) : (
          <WeatherForecastDetails />
        )}
      </AppWrapper>
      {/* </ErrorBoundary> */}
      {apiError && <div>Ошибка: {apiError}</div>}
    </>
  );
};

export default App;
