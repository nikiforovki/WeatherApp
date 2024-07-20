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
  align-items: flex-start;
  box-sizing: border-box;
  margin-top: 10px;
  max-width: 1320px;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 100%;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 100%;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 80%;
  }

  @media (min-width: 1367px) {
    width: 100%;
  }
`;

const StyledInputSearch = styled.div`
  flex-grow: 1;
  margin-right: 10px;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 200px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 600px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 630px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 912px;
  }

  @media (min-width: 1367px) {
    width: 912px;
  }
`;

const StyledTemperatureScale = styled.div`
  margin-right: 10px;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 100px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 100px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 100px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 100px;
  }

  @media (min-width: 1367px) {
    width: 100px;
  }
`;

const StuledTheme = styled.div`
  align-self: flex-end;
  box-sizing: border-box;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 100px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 100px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 100px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 100px;
  }

  @media (min-width: 1367px) {
    width: 100px;
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
