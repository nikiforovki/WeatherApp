import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTemperatureScale,
  putWeatherData,
} from '../../Redux/actions/actions';

interface State {
  temperatureScale?: string;
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  top: 50px;
  left: 1132px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
`;

// Определение компонента TemperatureToggleButton
const TemperatureToggleButton = styled.button<{ isActive: boolean }>`
  padding: 5px;
  margin: 0 5px;
  font-size: 14px;
  ${(props) =>
    props.isActive &&
    `
      color: red;
    `}
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Loading...</p>;
  }

  const handleClick = async () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius); // Обновляем локальное состояние шкалы

    // Запрашиваем данные о погоде с новой шкалой
    try {
      const response = await fetch(`/api/weather?scale=${newScale}`);
      const data = await response.json();

      // Обновляем данные о погоде в Redux store
      dispatch(putWeatherData(data));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <TemperatureToggleButton isActive={isCelsius}>C</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isActive={!isCelsius}>F</TemperatureToggleButton>
    </ToggleContainer>
  );
};
