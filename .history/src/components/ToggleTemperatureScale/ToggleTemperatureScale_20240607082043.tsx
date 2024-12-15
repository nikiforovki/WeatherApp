import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureScale } from '../../Redux/actions/actions';

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between; // Изменено на space-between для равномерного распределения элементов
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

const ToggleButton = styled.button`
  width: 48px; // Увеличена ширина для размещения текста
  height: 28px; // Увеличена высота для соответствия высоте контейнера
  color: ${(props) =>
    props.active ? 'rgb(26, 175, 224)' : 'rgba(19, 38, 74, 0.2)'};
  border: none;
  border-radius: 29px;
  padding: 0; // Убрано внутреннее заполнение
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
  text-align: center; // Добавлено выравнивание текста по центру
`;

const SlashButton = styled.button`
  width: auto; // Ширина теперь определяется содержимым
  height: 28px; // Увеличена высота для соответствия высоте контейнера
  color: rgb(16, 16, 16);
  border: none;
  padding: 0 5px; // Добавлены небольшие отступы слева и справа
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

export const TemperatureScaleToggle = () => {
  const dispatch = useDispatch();
  const temperatureScale = useSelector((state) => state.temperatureScale);

  if (!temperatureScale) {
    return <p>Загрузка...</p>;
  }

  const handleClick = () => {
    const newScale = temperatureScale === 'C' ? 'F' : 'C';
    dispatch(toggleTemperatureScale(newScale === 'C' ? 0 : 1));
  };

  return (
    <ToggleContainer onClick={handleClick}>
      <ToggleButton active={temperatureScale === 'C'}>
        {temperatureScale}
      </ToggleButton>
      <SlashButton>/</SlashButton>
      <ToggleButton active={temperatureScale !== 'C'}>
        {temperatureScale === 'C' ? 'F' : 'C'}
      </ToggleButton>
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
