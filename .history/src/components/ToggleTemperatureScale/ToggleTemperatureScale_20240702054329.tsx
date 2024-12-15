import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

interface State {
  temperatureScale?: string;
}

/* Adjusted ToggleContainer */
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  margin-top: 30px;
  /* Removed left property and transform */
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  @media (max-width: 375px) {
    margin-top: 30px;
    /* No need for top and left adjustments here */
  }

  @media (max-width: 1024px) {
    margin-top: 30px;
    /* Adjustments can still be made through margin and padding */
  }
`;

/* Adjusted TemperatureToggleButton */
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
  margin-right: 5px;
  /* Removed top and left properties */
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector(
    (state: State) => state.temperatureScale,
  );
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Загрузка...</p>;
  }

  const handleClick = () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius);
    const scaleNumber = newScale === 'C' ? 0 : 1;
    dispatch(toggleTemperatureScale(scaleNumber));
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <TemperatureToggleButton isActive={isCelsius}>С</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isActive={!isCelsius}>F</TemperatureToggleButton>
    </ToggleContainer>
  );
};
