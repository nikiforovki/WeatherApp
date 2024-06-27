import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherHeader = () => {
  return (
    <Container>
      <InputSearch onCityChange={(city) => console.log(city)} />
      {/* <TemperatureScaleToggle /> */}
    </Container>
  );
};
