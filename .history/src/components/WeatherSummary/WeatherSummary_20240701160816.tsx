import React from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const WeatherSummaryConteiner = styled.div`
  // display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLine = styled.div`
  // position: fixed;
  top: 510px;
  left: 0;
  width: 1366px;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);
  margin-top: 135px;

  @media (max-width: 375px) {
    top: 650px;
  }

  @media (max-width: 735px) {
    top: 750px;
  }

  @media (max-width: 1024px) {
    top: 820px;
  }
`;
const StyledText = styled.div`
  // position: relative;
  font-size: 24px;
  color: var(--weatherCardline);
  top: 542px;
  left: 50px;
  width: 190px;
  height: 31px;

  @media (max-width: 375px) {
    // top: 350px;
    margin-top: 10px;
    margin-left: 50px;
  }

  @media (max-width: 1024px) {
    // top: 350px;
    margin-top: 10px;
    margin-left: 50px;
  }
`;

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <ToggleTheme />
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
      <StyledLine />
      <StyledText>Weather Details</StyledText>
    </WeatherSummaryConteiner>
  );
};
