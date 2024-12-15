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

const TemperatureToggleButton = styled.button`
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
      <TemperatureToggleButton isActive={isCelsius}>С</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isActive={!isCelsius}>F</TemperatureToggleButton>
    </ToggleContainer>
  );
};

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleTemperatureScale } from '../../Redux/actions/actions';

// const activeStyle = {
//   color: '#1AAFE0',
//   fontSize: '18px',
// };

// const inactiveStyle = {
//   backgroundColor: '#fff',
//   color: '#000',
//   fontSize: '18px',
// };

// const ToggleContainer = styled.div`
//   position: fixed;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 163px;
//   height: 38px;
//   top: 32px;
//   left: 1132px;
//   top: 50px;
//   transform: translate(-50%, -50%);
//   background: #ffffff;
//   border-radius: 29px;
//   padding: 5px;
//   cursor: pointer;
// `;

// const StyledToggleButton = styled.button`
//   font-size: 18px;
//   width: 12px;
//   height: 22px;
//   border: none;
//   border-radius: 29px;
//   padding: 5px 10px;
//   cursor: pointer;
//   transition: color 0.3s ease;
//   background: none;
//   ${(props) =>
//     props.isActive
//       ? `color: ${activeStyle.color};`
//       : `color: ${inactiveStyle.color};`}
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
//   const [isCelsius, setIsCelsius] = useState(temperatureScale === 'C');

//   if (!temperatureScale) {
//     return <p>Загрузка...</p>;
//   }

//   const handleClick = () => {
//     const newScale = isCelsius ? 'F' : 'C';
//     setIsCelsius(!isCelsius);
//     dispatch(toggleTemperatureScale(newScale === 'C'));
//   };

//   return (
//     <ToggleContainer onClick={handleClick}>
//       <StyledToggleButton isActive={isCelsius}>С</StyledToggleButton>
//       <SlashButton>/</SlashButton>
//       <StyledToggleButton isActive={!isCelsius}>F</StyledToggleButton>
//     </ToggleContainer>
//   );
// };
