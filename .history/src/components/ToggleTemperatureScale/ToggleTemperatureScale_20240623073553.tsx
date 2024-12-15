import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  top: 32px;
  left: 1132px;
  top: 50px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
`;

const TemperatureToggleButton: StyledComponent<
  any,
  any,
  TemperatureToggleButtonProps
> = styled(({ isActive, ...props }) => (
  <button {...props} isActive={isActive} />
))`
  font-size: 18px;
  width: 12px;
  height: 22px;
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.3s ease;
  background: none;
  color: ${(props) => (props.isActive ? '#1AAFE0' : '#000')};
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale); // Замените на ваш тип состояния
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Загрузка...</p>;
  }

  const handleClick = () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius);
    dispatch(toggleTemperatureScale(newScale));
  };

  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '163px',
        height: '38px',
        top: '50px',
        left: '1132px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        borderRadius: '29px',
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      <TemperatureToggleButton isActive={isCelsius}>С</TemperatureToggleButton>
      <span>/</span>
      <TemperatureToggleButton isActive={!isCelsius}>F</TemperatureToggleButton>
    </div>
  );
};
