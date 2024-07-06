import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box; // Убедитесь, что ширина включает внутренние отступы
`;

const StyledInputSearch = styled.div`
  flex-grow: 1;
  margin-right: auto;
  display: flex; // Для вертикального выравнивания содержимого внутри
  align-items: center; // Выравнивание по центру по вертикали
`;

const StyledTemperatureScale = styled.div`
  display: flex; // Для вертикального выравнивания содержимого внутри
  align-items: center; // Выравнивание по центру по вертикали
  margin-left: auto; // Оттолкнуть справа
  top: 38px;
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
