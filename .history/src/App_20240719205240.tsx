import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import GlobalStyles from '../GlobalStyles';
import 'react-loading-skeleton/dist/skeleton.css';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';

const AppWrapper = styled.div`
  // width: 1366px; //Выключел
  // min-width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) =>
    `linear-gradient(180deg, var(--${theme === 'light' ? 'primary-color' : 'secondary-color'}) 0%, var(--${theme === 'light' ? 'secondary-color' : 'primary-color'}) 100%) 0% 0% no-repeat padding-box`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', sans-serif;
`;

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <GlobalStyles />
      <AppWrapper theme={theme}>
        <WeatherHeader />
        <WeatherSummary />
      </AppWrapper>
    </>
  );
};

export default App;
