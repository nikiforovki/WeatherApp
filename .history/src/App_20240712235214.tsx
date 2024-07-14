import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';
import GlobalStyles from '../GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import WeatherSkeleton from './components/Selecton/WeatherSkeleton';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 250vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, var(--${theme === 'light' ? 'primary-color' : 'secondary-color'}) 0%, var(--${theme === 'light' ? 'secondary-color' : 'primary-color'}) 100%) 0% 0% no-repeat padding-box`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', sans-serif;
`;
const StyledLine = styled.div`
  // position: absolute;
  top: 510px;
  left: 0;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);

  @media (min-width: 375px) and (max-width: 768px) {
    top: 30px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 90px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    top: 510px;
  }
  @media (min-width: 1295px) and (max-width: 1366px) {
    margin-top: 150px;
  }

  @media (min-width: 1367px) {
    margin-top: 150px;
  }
`;

const App = () => {
  const [apiError, setApiError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // оТОБРАЖЕНИЯ КОМПАНЕНТА С КАРТОЧКАМИ
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

  useEffect(() => {
    // console.log('isLoading changed:', isLoading);
  }, [isLoading]);

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
        <StyledLine />
        <WeatherSummary />
        {/* {isLoading ? <WeatherSkeleton count={1} /> : <WeatherForecastDetails />} */}
      </AppWrapper>
    </>
  );
};

export default App;
