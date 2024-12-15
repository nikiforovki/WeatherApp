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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1356px;
`;

const StyledInputSearch = styled.div`
  // flex: 1;
  // margin: 5px;
  // max-width: 100%;
`;

const StyledTemperatureScale = styled.div`
  // flex: 1;
  // // margin: 20px;
  // max-width: 100%;
`;

const StuledTheme = styled.div`
  // flex: 1;
  // // margin: 5px;
  // align-self: flex-end;
  // // max-width: 100%;
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
