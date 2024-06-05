import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions'; // Убедитесь, что путь к файлу actions правильный

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  left: 50%; /* Изменено */
  top: 50%; /* Изменено */
  transform: translate(-50%, -50%); /* Центрирование относительно родителя */
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

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector(
    (state) => state.weatherReducer?.temperatureScale,
  ); // Добавлена проверка на существование
  console.log('Температура в кнопке', temperatureScale); // Добавлена проверка на сущ

  if (!temperatureScale) {
    return null; // Или возвращайте заглушку, пока данные не будут загружены
  }

  const handleClick = () => {
    dispatch(toggleTemperatureScale());
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <ActiveToggleButton>{temperatureScale}</ActiveToggleButton>
      <SlashButton>/</SlashButton>
      <InactiveToggleButton>
        {temperatureScale === 'C' ? 'F' : 'C'}
      </InactiveToggleButton>
    </ToggleContainer>
  );
};

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';

// const ToggleContainer = styled.div`
//   position: fixed;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 163px;
//   height: 38px;
//   left: 1132px;
//   top: 32px;
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

// export const TemperatureScaleToggle = ({
//   onScaleChange,
// }: {
//   onScaleChange: (scale: 'C' | 'F') => void;
// }) => {
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     const newIsActive = !isActive;
//     setIsActive(newIsActive);
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
