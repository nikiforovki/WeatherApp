import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const weatherState = useSelector((state) => state.weather); // Получаем весь объект состояния weather
  const weatherUnit = weatherState?.weatherUnit; // Используем опциональное связывание для безопасного доступа
  const [isMetric, setIsMetric] = useState(
    !!weatherUnit && weatherUnit === 'metric',
  );

  if (!weatherUnit) {
    return <p>Loading...</p>; // Отображаем загрузочный текст, пока состояние не будет готово
  }

  const handleClick = () => {
    const newScale = isMetric ? 'imperial' : 'metric';
    setIsMetric(newScale === 'metric');
    dispatch(toggleTemperatureScale(newScale));
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <TemperatureToggleButton isActive={isMetric}>℃</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isActive={!isMetric}>℉</TemperatureToggleButton>
    </ToggleContainer>
  );
};

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleTemperatureScale } from '../../Redux/actions/actions';

// interface State {
//   temperatureScale?: string;
// }

// const ToggleContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 163px;
//   height: 38px;
//   top: 50px;
//   left: 1132px;
//   // transform: translate(-50%, -50%);
//   background: #ffffff;
//   border-radius: 29px;
//   padding: 5px;
//   cursor: pointer;

//   // @media (max-width: 375px) {
//   //   margin-left: 10px;
//   //   margin-top: 38px;
//   //   // left: 300px;
//   // }

//   // @media (max-width: 1024px) {
//   //   margin-left: -200px;
//   //   margin-top: -150px;
//   // }
// `;

// const TemperatureToggleButton = styled.button<{ isActive?: boolean }>`
//   font-size: 18px;
//   width: 12px;
//   height: 22px;
//   border: none;
//   border-radius: 29px;
//   cursor: pointer;
//   transition: color 0.3s ease;
//   background: none;
//   color: ${(props) => (props.isActive ? '#1AAFE0' : '#13264A33')};
//   margin-right: 10px;
//   top: 4px;
// `;

// export const TemperatureScaleToggle = () => {
//   const dispatch = useDispatch();
//   const temperatureScale = useSelector(
//     (state: State) => state.temperatureScale,
//   );
//   const [isCelsius, setIsCelsius] = useState(temperatureScale === 'metric');

//   if (!temperatureScale) {
//     return <p>Загрузка...</p>;
//   }

//   const handleClick = () => {
//     const newScale = isCelsius ? 'imperial' : 'metric';
//     setIsCelsius(newScale === 'metric');
//     dispatch(toggleTemperatureScale(newScale));
//   };

//   return (
//     <ToggleContainer onClick={handleClick}>
//       <TemperatureToggleButton isActive={isCelsius}>℃</TemperatureToggleButton>
//       <TemperatureToggleButton>/</TemperatureToggleButton>
//       <TemperatureToggleButton isActive={!isCelsius}>℉</TemperatureToggleButton>
//     </ToggleContainer>
//   );
// };
