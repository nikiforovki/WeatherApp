import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';
import { selectWeatherUnit } from '../../Redux/slice/currentweatherSlice';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  top: 50px;
  // left: 1132px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 375px) and (max-width: 768px) {
    // left: 300px;
    margin-left: 100px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    // left: 200px;
    margin-left: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    // left: 900px;
    margin-left: 50px;
  }

  @media (min-width: 1367px) {
    left: 1132px;
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
    console.log(`Changing scale to: ${newScale}`);
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
