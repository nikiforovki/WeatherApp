import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Container = styled.div`
  display: flex;

  align-items: flex-start;
  box-sizing: border-box;
`;

const StyledInputSearch = styled.div`
  display: flex;
  align-items: center;

  // padding-left: 30px;
  // box-sizing: border-box;
`;

const StyledTemperatureScale = styled.div`
  align-items: center;
  margin-left: 50px;
  margin-right: 0;
  margin-top: 32px;
`;

const StuledTheme = styled.div`
  padding-left: 30px;
  box-sizing: border-box;
`;

export const WeatherHeader = () => {
  const handleCityChange = (city: string) => {
    console.log(city);
  };

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
