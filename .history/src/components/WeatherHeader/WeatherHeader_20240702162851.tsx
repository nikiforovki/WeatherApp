import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const StyledInputSearch = styled.div`
  position: fixed;
  flex-grow: 1;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const StyledTemperatureScale = styled.div`
  // position: fixed;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 38px;
`;
const StuledTheme = styled.div``;

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
      {/* <ToggleTheme></ToggleTheme> */}
    </Container>
  );
};
