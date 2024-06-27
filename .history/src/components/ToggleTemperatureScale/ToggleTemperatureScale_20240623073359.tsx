import React, { useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

// Предполагаемый тип состояния Redux, замените его на ваш фактический тип
interface RootState {
  temperatureScale: 'C' | 'F';
}

interface TemperatureToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

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
  // Используйте RootState для типа состояния
  const temperatureScale = useSelector(
    (state: RootState) => state.temperatureScale,
  );
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Загрузка...</p>;
  }

  const handleClick = () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius);
    // Убедитесь, что вы передаете строку, а не булево значение
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
