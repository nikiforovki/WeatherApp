import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1356px;
`;

const StyledInputSearch = styled.div`
  flex: 1;
`;

const StyledTemperatureScale = styled.div`
  flex: 1;
`;

const StuledTheme = styled.div`
  flex: 1;
`;

export const WeatherHeader = () => {
  const handleCityChange = (city: string) => {};

  return (
    <Container>
      <StyledInputSearch>
        <InputSearch onCityChange={handleCityChange} />
      </StyledInputSearch>
      <StyledTemperatureScale>
        <TemperatureScaleToggle />
      </StyledTemperatureScale>
      <StuledTheme>
        <ToggleTheme />
      </StuledTheme>
    </Container>
  );
};
