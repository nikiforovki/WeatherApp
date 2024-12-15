import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import { WeatherForecastDetails } from '../WeatherForecastDetails/WeatherForecastDetails';

const WeatherSummaryConteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative; // Добавлено позиционирование
`;

const StyledLine = styled.div`
  width: 100%; // Используйте ширину для горизонтальной линии
  height: 0.5px;
  border-top: 1px solid var(--weatherCardline); // Используйте border-top для линии
  margin-top: 135px;

  @media (max-width: 375px) {
    margin-top: 650px;
  }

  @media (max-width: 735px) {
    margin-top: 750px;
  }

  @media (max-width: 1024px) {
    margin-top: 100px;
  }
`;

const StyledText = styled.div`
  font-size: 24px;
  color: var(--weatherCardline);
  margin-top: 32px;
  margin-left: 71px;
  width: 190px;
  height: 31px;

  @media (max-width: 375px) {
    margin-top: 32px;
    margin-left: 150px;
  }

  @media (max-width: 1024px) {
    margin-top: 32px;
    margin-left: 150px;
  }
`;

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
      <StyledLine />
      <StyledText>Weather Details</StyledText>
      <WeatherForecastDetails />
    </WeatherSummaryConteiner>
  );
};
