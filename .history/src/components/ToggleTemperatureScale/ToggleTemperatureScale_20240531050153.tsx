import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  left: 1132px;
  top: 32px;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
`;

const ActiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgba(19, 38, 74, 0.2);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const InactiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgb(26, 175, 224);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const SlashButton = styled.button`
  width: 12px;
  height: 21px;
  color: rgb(16, 16, 16);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

export const TemperatureScaleToggle = ({
  onScaleChange,
}: {
  onScaleChange: (scale: 'C' | 'F') => void;
}) => {
  // Используем локальное состояние для отслеживания активного масштаба
  const [activeScale, setActiveScale] = useState<'C' | 'F'>('C');

  const handleClick = () => {
    // Переключаем активный масштаб
    setActiveScale(activeScale === 'C' ? 'F' : 'C');
    // Обновляем состояние в родительском компоненте
    onScaleChange(activeScale);
  };

  return (
    <ToggleContainer onClick={handleClick}>
      {/* Отображаем активный масштаб */}
      <span>{activeScale.toUpperCase()}</span>
      <SlashButton>/</SlashButton>
      {/* Символы для переключения масштаба */}
      <button onClick={handleClick}>C</button>
      <button onClick={handleClick}>F</button>
    </ToggleContainer>
  );
};

// export const TemperatureScaleToggle = ({
//   onScaleChange,
// }: {
//   onScaleChange: (scale: 'C' | 'F') => void;
// }) => {
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     // Сохраняем новое значение isActive в переменную
//     const newIsActive = !isActive;
//     setIsActive(newIsActive);
//     // Теперь используем новое значение для определения масштаба температуры
//     onScaleChange(newIsActive ? 'F' : 'C');
//   };

//   return (
//     <ToggleContainer onClick={handleClick}>
//       {isActive ? (
//         <ActiveToggleButton>C</ActiveToggleButton>
//       ) : (
//         <InactiveToggleButton>C</InactiveToggleButton>
//       )}
//       <SlashButton>/</SlashButton>
//       {!isActive ? (
//         <ActiveToggleButton>F</ActiveToggleButton>
//       ) : (
//         <InactiveToggleButton>F</InactiveToggleButton>
//       )}
//     </ToggleContainer>
//   );
// };
