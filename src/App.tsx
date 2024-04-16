import React from 'react';
import styled from 'styled-components';
import { WeatherHeader } from './components/WeatherHeader/WeatherHeader';
import { WeatherSummary } from './components/WeatherSummary/WeatherSummary';
import { WeatherForecastDetails } from './components/WeatherForecastDetails/WeatherForecastDetails';

const AppWrapper = styled.div`
  width: 1366px;
  height: 1042px;
  top: 0;
  left: 0;
  background: transparent linear-gradient(180deg, #20d1bc 0%, #1aade3 100%) 0%
    0% no-repeat padding-box;
`;
const App = () => {
  return (
    <AppWrapper>
      <WeatherHeader />
      <WeatherSummary />
      <WeatherForecastDetails />
    </AppWrapper>
  );
};

export default App;
