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
  padding: 5px;
  border: 1px solid red;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledInputSearch = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 100%;

  @media (min-width: 320px) and (max-width: 374px) {
    width: 100%;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 100%;
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
  flex: 1;
  margin: 10px;
  max-width: 100%;

  @media (min-width: 320px) and (max-width: 375px) {
    left: 50px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 10%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 100%;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 100%;
  }

  @media (min-width: 1367px) {
    width: 100%;
  }
`;

const StuledTheme = styled.div`
  flex: 1;
  margin: 5px;
  align-self: flex-end;
  // max-width: 100%;

  @media (min-width: 320px) and (max-width: 374px) {
    width: 10%;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 10%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 10%;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 10%;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 10%;
  }

  @media (min-width: 1367px) {
    width: 10%;
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
