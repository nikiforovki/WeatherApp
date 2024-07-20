import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';
import { selectWeatherUnit } from '../../Redux/slice/currentweatherSlice';

// const ToggleContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 163px;
//   height: 38px;
//   top: 50px;
//   background: #ffffff;
//   border-radius: 29px;
//   padding: 5px;
//   cursor: pointer;

//   @media (min-width: 320px) and (max-width: 374px) {
//     margin-left: 40px;
//   }
const ToggleContainer = styled.div`
  // position: ; // Изменяем на абсолютное позиционирование
  top: 0; // Перемещаем элемент на самый верхний край
  left: 0; // Центрирование по горизонтали
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 320px) and (max-width: 374px) {
    width: 100px;
    height: 38px;
    // margin-left: 40px;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    margin-left: 10px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    margin-left: 10px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    margin-left: 50px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    margin-left: 10px;
  }
  @media (min-width: 1295px) and (max-width: 1366px) {
    margin-left: 70px;
  }

  @media (min-width: 1367px) {
    margin-left: 60px;
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
