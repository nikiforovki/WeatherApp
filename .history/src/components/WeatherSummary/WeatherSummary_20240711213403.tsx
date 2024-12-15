import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import { WeatherForecastDetails } from '../WeatherForecastDetails/WeatherForecastDetails';

const WeatherSummaryConteiner = styled.div`
  // position: relative;
  justify-content: space-between;
  align-items: center;
  top: 613px;
`;

// const StyledLine = styled.div`
//   top: 510px;
//   left: 0;
//   height: 0.5px;
//   border: 1px solid var(--weatherCardline);
//   margin-top: 135px;

//   @media (max-width: 375px) {
//     top: 650px;
//   }

//   @media (max-width: 735px) {
//     top: 750px;
//   }

//   @media (max-width: 1024px) {
//     margin-top: 100px;
//   }
// `;
// const StyledText = styled.div`
//   font-size: 24px;
//   color: var(--weatherCardline);
//   margin-top: 32px;
//   margin-left: 71px;
//   width: 190px;
//   height: 31px;

//   @media (max-width: 375px) {
//     margin-top: 32px;
//     margin-left: 150px;
//   }

//   @media (max-width: 1024px) {
//     margin-top: 32px;
//     margin-left: 150px;
//   }
// `;

export const WeatherSummary = () => {
  return (
    <WeatherSummaryConteiner>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
      {/* <StyledLine />
      <StyledText>Weather Details</StyledText> */}
      <WeatherForecastDetails />
    </WeatherSummaryConteiner>
  );
};
