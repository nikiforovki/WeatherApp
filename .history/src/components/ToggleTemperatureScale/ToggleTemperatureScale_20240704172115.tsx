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

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Loading...</p>;
  }

  const handleClick = async () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius);
    dispatch(toggleTemperatureScale(newScale));

    // Здесь вы можете вызвать API для получения новых данных
    try {
      const response = await fetch(`/api/weather?scale=${newScale}`);
      const data = await response.json();
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
