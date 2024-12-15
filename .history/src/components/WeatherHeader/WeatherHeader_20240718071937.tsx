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
  flex-wrap: wrap; // Позволяет элементам переноситься на новую строку при необходимости
  justify-content: space-between; // Равномерно распределяет элементы по горизонтали
  align-items: center; // Выравнивает элементы по вертикали
  padding: 20px;
  border: 1px solid #red;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column; // Сворачивает элементы в столбец на маленьких экранах
  }

  @media (min-width: 320px) and (max-width: 375px) {
    width: 375px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 768px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    width: 879px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    // width: 1294px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 1025px;
  }
  @media (min-width: 1295px) and (max-width: 1365px) {
    width: 1365px;
  }

  @media (min-width: 1366px) {
    width: 1366px;
  }
`;

const StyledInputSearch = styled.div`
  // float: left;
  // align-items: center;

  @media (min-width: 320px) and (max-width: 374px) {
    width: 200px;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 600px;
  }
  @media (min-width: 769px) and (max-width: 879px) {
    width: 800px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    width: 100%;
    max-width: 1024px;
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
  // float: left;
  // align-items: center;
  // margin-right: 0;
  // margin-top: 32px;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 100px;
    height: 38px;
    // margin-left: 40px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    // right: 71px;
    left: 149px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    // right: 71px;
    left: 1132px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    right: 71px;
    // left: 1132px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    // right: 71px;
    left: 1132px;
  }
  @media (min-width: 1295px) and (max-width: 1366px) {
    // right: 160px;
    // left: 1000px;
  }

  @media (min-width: 1367px) {
    // right: 160px;
    left: 1132px;
  }
`;

const StuledTheme = styled.div`
  // float: left;
  align-self: flex-end;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 374px) {
    top: 40px;
    right: 71px;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    top: 40px;
    right: 71px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    top: 40px;
    right: 71px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    top: 40px;
    right: 71px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    // top: 40px;
    right: 71px;
  }

  @media (min-width: 1367px) {
    right: 71px;
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
