import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import { WeatherForecastDetails } from '../WeatherForecastDetails/WeatherForecastDetails';

const WeatherSummaryConteiner = styled.div`
  position: relative;
  justify-content: space-between;
  // align-items: center;
  // top: 613px;
`;
const StyledDescription = styled.div`
  width: 500px;
  height: 500px;
`;

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
      <StyledDescription>
        <WeatherForecastDetails />
      </StyledDescription>
    </WeatherSummaryConteiner>
  );
};
