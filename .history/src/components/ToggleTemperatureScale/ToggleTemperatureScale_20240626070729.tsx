import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCelsius?: boolean;
}

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 38px;
  top: 50px;
  left: 1132px;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;
  @media (max-width: 375px) {
    left: 300px;
  }

  @media (max-width: 1024px) {
    left: 550px;
  }
`;

const TemperatureToggleButton = styled.button<{ isCelsius?: boolean }>`
  position: relative;
  font-size: 18px;
  width: 12px;
  height: 22px;
  border: none;
  border-radius: 29px;
  cursor: pointer;
  transition: color 0.3s ease;
  background: none;
  color: ${(props) => (props.isCelsius ? '#1AAFE0' : '#13264A33')};
  margin-right: 10px;
  top: 4px;
`;

interface TemperatureScaleToggleProps {}

export const TemperatureScaleToggle: FC<TemperatureScaleToggleProps> = () => {
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
      <TemperatureToggleButton isCelsius={isCelsius}>С</TemperatureToggleButton>
      <TemperatureToggleButton>/</TemperatureToggleButton>
      <TemperatureToggleButton isCelsius={!isCelsius}>
        F
      </TemperatureToggleButton>
    </ToggleContainer>
  );
};

//Работает
// import React, { useState } from 'react';
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
//   top: 50px;
//   left: 1132px;
//   transform: translate(-50%, -50%);
//   background: #ffffff;
//   border-radius: 29px;
//   padding: 5px;
//   cursor: pointer;
//   @media (max-width: 375px) {
//     left: 300px;
//   }

//   @media (max-width: 1024px) {
//     left: 550px;
//   }
// `;

// const TemperatureToggleButton = styled.button`
//   position: relative;
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
//       <TemperatureToggleButton isActive={isCelsius}>С</TemperatureToggleButton>
//       <TemperatureToggleButton>/</TemperatureToggleButton>
//       <TemperatureToggleButton isActive={!isCelsius}>F</TemperatureToggleButton>
//     </ToggleContainer>
//   );
// };
