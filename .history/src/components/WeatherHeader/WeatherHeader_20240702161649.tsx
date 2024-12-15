import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // Убедитесь, что он занимает всю ширину
`;

const StyledInputSearch = styled.div`
  flex-grow: 1; // Позволяет поисковому полю занимать доступное пространство
  margin-right: auto; // Двигает переключатель масштаба температуры вправо
`;

const StyledTemperatureScale = styled.div`
  margin-left: auto; // Двигает переключатель масштаба температуры вправо
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
