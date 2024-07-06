import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

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
  // transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  // @media (max-width: 375px) {
  //   margin-left: 10px;
  //   margin-top: 38px;
  //   // left: 300px;
  // }

  // @media (max-width: 1024px) {
  //   margin-left: -200px;
  //   margin-top: -150px;
  // }
`;

const TemperatureToggleButton = styled.button<{ isactive?: boolean }>`
  font-size: 18px;
  width: 12px;
  height: 22px;
  border: none;
  border-radius: 29px;
  cursor: pointer;
  transition: color 0.3s ease;
  background: none;
  color: ${(props) => (props.isactive ? '#1AAFE0' : '#13264A33')};
  margin-right: 10px;
  top: 4px;
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale); // Изменено для работы с строковым значением
  const [isMetric, setIsMetric] = useState(temperatureScale === 'metric'); // Используем логическую переменную для отслеживания выбранной шкалы

  const handleClick = () => {
    const newScale = isMetric ? 'imperial' : 'metric'; // Переключаем шкалу между 'metric' и 'imperial'
    setIsMetric(newScale === 'metric'); // Обновляем локальное состояние для отображения
    dispatch(toggleTemperatureScale(newScale)); // Отправляем действие с новым значением шкалы
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <TemperatureToggleButton isactive={isMetric}>°C</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isactive={!isMetric}>°F</TemperatureToggleButton>
    </ToggleContainer>
  );
};
