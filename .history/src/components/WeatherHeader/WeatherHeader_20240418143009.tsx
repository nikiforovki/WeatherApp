import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import { WeatherSummary } from '../WeatherSummary/WeatherSummary';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherHeader = () => {
  return (
    <HeaderContainer>
      {/*<InputSearch onCityChange={(city) => console.log(city)} />*/}
      <TemperatureScaleToggle />
    </HeaderContainer>
  );
};
