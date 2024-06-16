import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

// Определение стилей для активной и неактивной кнопок
const activeStyle = {
  backgroundColor: '#f00', // Пример цвета для активной кнопки
  color: '#fff',
};

const inactiveStyle = {
  backgroundColor: '#fff', // Пример цвета для неактивной кнопки
  color: '#000',
};

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  left: 1200px;
  top: 50px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
`;

const StyledToggleButton = styled.button`
  width: 12px;
  height: 22px;
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.3s ease; // Удалено background из списка переходов, так как он больше не используется
  ${(props) =>
    props.isActive
      ? `color: ${activeStyle.color};` // Применяем только цвет для активной кнопки
      : `color: ${inactiveStyle.color};`}// Применяем только цвет для неактивной кнопки
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

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

  if (!temperatureScale) {
    return <p>Загрузка...</p>;
  }

  const handleClick = () => {
    const newScale = isCelsius ? 'F' : 'C';
    setIsCelsius(!isCelsius);
    dispatch(toggleTemperatureScale(newScale === 'C'));
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <StyledToggleButton isActive={isCelsius}>С</StyledToggleButton>
      <SlashButton>/</SlashButton>
      <StyledToggleButton isActive={!isCelsius}>F</StyledToggleButton>
    </ToggleContainer>
  );
};

// import React from 'react';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleTemperatureScale } from '../../Redux/actions/actions';

// const ToggleContainer = styled.div`
//   position: fixed;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 163px;
//   height: 38px;
//   left: 1200px;
//   top: 50px;
//   transform: translate(-50%, -50%);
//   background: #ffffff;
//   border-radius: 29px;
//   padding: 5px;
//   cursor: pointer;
// `;

// const ActiveToggleButton = styled.button`
//   width: 12px;
//   height: 22px;
//   color: rgba(19, 38, 74, 0.2);
//   border: none;
//   border-radius: 29px;
//   padding: 5px 10px;
//   cursor: pointer;
//   transition:
//     background 0.3s ease,
//     color 0.3s ease;
//   background: none;
// `;

// const InactiveToggleButton = styled.button`
//   width: 12px;
//   height: 22px;
//   color: rgb(26, 175, 224);
//   border: none;
//   border-radius: 29px;
//   padding: 5px 10px;
//   cursor: pointer;
//   transition:
//     background 0.3s ease,
//     color 0.3s ease;
//   background: none;
// `;

// const SlashButton = styled.button`
//   width: 12px;
//   height: 21px;
//   color: rgb(16, 16, 16);
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   transition:
//     background 0.3s ease,
//     color 0.3s ease;
//   background: none;
// `;

// export const TemperatureScaleToggle = () => {
//   const dispatch = useDispatch();
//   const temperatureScale = useSelector((state) => state.temperatureScale);

//   if (!temperatureScale) {
//     return <p>Загрузка...</p>;
//   }

//   const handleClick = () => {
//     const newScale = temperatureScale === 'C' ? 'F' : 'C';
//     dispatch(toggleTemperatureScale(newScale === 'C' ? 0 : 1));
//   };

//   return (
//     <ToggleContainer onClick={handleClick}>
//       <ActiveToggleButton>{temperatureScale}</ActiveToggleButton>
//       <SlashButton>/</SlashButton>
//       <InactiveToggleButton>
//         {temperatureScale === 'C' ? 'F' : 'C'}
//       </InactiveToggleButton>
//     </ToggleContainer>
//   );
// };
