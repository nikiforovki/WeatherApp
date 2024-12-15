import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
import GlobalStyles from '../GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, var(--${theme === 'light' ? 'primary-color' : 'secondary-color'}) 0%, var(--${theme === 'light' ? 'secondary-color' : 'primary-color'}) 100%) 0% 0% no-repeat padding-box`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', sans-serif;
`;

const App = () => {
  const [apiError, setApiError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleApiError = (error) => {
    setApiError(error.message);
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCityChange = (newCity: string) => {};

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <WeatherHeader />
        <WeatherSummary />
      </AppWrapper>
    </>
  );
};

export default App;
