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
  justify-content: space-between;
  align-items: flex-start; // Выравниваем элементы по центру по вертикали
  box-sizing: border-box;
  // margin-top: 10px;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 320px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 375px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    width: 769px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    width: 880px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 1025px;
  }
  @media (min-width: 1295px) and (max-width: 1365px) {
    width: 1295px;
  }

  @media (min-width: 1366px) {
    width: 1366px;
  }
`;

const StyledInputSearch = styled.div`
  // float: left;
  // align-items: center;
`;

const StyledTemperatureScale = styled.div`
  // float: left;
  // align-items: center;
  margin-right: 0;
  margin-top: 32px;
`;

const StuledTheme = styled.div`
  // float: left;
  align-self: flex-end;
  box-sizing: border-box;

  @media (min-width: 320px) and (max-width: 374px) {
    margin-top: 60px;
    // margin-left: 100px;
    right: 100px;
    // left: 230px;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    // top: 60px;
    // left: 250px;
    left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    left: 10px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    left: 10px;
  }

  @media (min-width: 1367px) {
    left: 10px;
  }
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
