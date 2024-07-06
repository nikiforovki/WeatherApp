import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const StyledInputSearch = styled.div`
  top: 38px;
`;
const StyledTemperatureScale = styled.div`
  margin-top: 38px
  margin-left: 900px;
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
