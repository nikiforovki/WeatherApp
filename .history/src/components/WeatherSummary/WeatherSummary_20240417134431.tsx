import React from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';

const WeatherSummaryConteiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
    </WeatherSummaryConteiner>
  );
};
