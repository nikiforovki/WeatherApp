import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  // display: flex;

  justify-content: space-between;
  align-items: center;
`;
const StyledTemperatureScaleToggle = styled.div`
  position: relative;
  margin-top: -200px;
  margin-left: 650px;

  @media (max-width: 375px) {
    margin-top: -100px;
    margin-left: 500px;
  }

  @media (max-width: 1024px) {
    margin-top: -200px;
    margin-left: 500px;
  }
`;

export const WeatherHeader = () => {
  const handleCityChange = (city: string) => {
    console.log(city);
  };

  return (
    <Container>
      <InputSearch onCityChange={handleCityChange} />
    </Container>
  );
};
