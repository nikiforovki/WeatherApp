import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

// const Container = styled.div`
//   // display: flex;
//   align-items: flex-start;
//   box-sizing: border-box;
//   margin-top: 10px;
// `;

// const StyledInputSearch = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const StyledTemperatureScale = styled.div`
//   align-items: center;
//   margin-right: 0;
//   margin-top: 32px;
// `;

// const StuledTheme = styled.div`
//   box-sizing: border-box;
// `;

const Container = styled.div`
  // overflow: auto;
  box-sizing: border-box;
  top: 32px;
  width: 300px;
`;

const StyledInputSearch = styled.div`
  float: left;
  align-items: center;
`;

const StyledTemperatureScale = styled.div`
  float: left;
  align-items: center;
  margin-right: 0;
  margin-top: 32px;
`;

const StuledTheme = styled.div`
  float: left;
  box-sizing: border-box;
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
