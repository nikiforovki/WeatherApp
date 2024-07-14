import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import { WeatherForecastDetails } from '../WeatherForecastDetails/WeatherForecastDetails';

const WeatherSummaryConteiner = styled.div`
  justify-content: space-between;
  align-items: center;
  top: 100px;
`;
const StyledLine = styled.div`
  // position: relative;
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

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />

      <WeatherForecastDetails />
      <StyledLine />
    </WeatherSummaryConteiner>
  );
};
