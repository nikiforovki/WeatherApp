import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';
import { selectWeatherUnit } from '../../Redux/slice/currentweatherSlice';

const ToggleContainer = styled.div`
  position: absolute; // Абсолютное позиционирование
  top: 38px; // Верхняя граница элемента будет на самом верхнем краю ближайшего родителя с позиционированием
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  top: 32px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 90px;
    height: 38px;
    right: 10px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    right: 10px;
    max-width: 768px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    right: 10px;
    max-width: 879px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    right: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    right: 120px;
  }
  @media (min-width: 1295px) and (max-width: 1365px) {
    left: 1030px;
  }

  @media (min-width: 1366px) {
    left: 1050px;
  }
`;

const TemperatureToggleButton = styled.button<{ isActive?: boolean }>`
  font-size: 18px;
  width: 12px;
  height: 22px;
  border: none;
  border-radius: 29px;
  cursor: pointer;
  transition: color 0.3s ease;
  background: none;
  color: ${(props) => (props.isActive ? '#1AAFE0' : '#13264A33')};
  margin-right: 10px;
  top: 4px;
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const weatherUnit = useSelector(selectWeatherUnit);
  const [isMetric, setIsMetric] = useState(weatherUnit === 'metric');

  const handleClick = () => {
    const newScale = isMetric ? 'imperial' : 'metric';
    setIsMetric(newScale === 'metric');
    dispatch(toggleTemperatureScale('Berlin', newScale));
  };
  return (
    <ToggleContainer onClick={handleClick}>
      <TemperatureToggleButton isActive={isMetric}>C</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isActive={!isMetric}>F</TemperatureToggleButton>
    </ToggleContainer>
  );
};
