// import React from 'react';
// import styled from 'styled-components';
// import { InputSearch } from '../InputSearch/InputSearch';
// import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
// import ToggleTheme from '../ToggleTheme/ToggleTheme';

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   // box-sizing: border-box;
// `;

// const StyledInputSearch = styled.div`
//   flex-grow: 1;
//   margin-right: auto;
//   display: flex;
//   align-items: center;
// `;

// const StyledTemperatureScale = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: auto;
//   margin-top: 32px;
// `;

// const StyledTheme = styled.div`
//   display: flex;
//   align-items: center;

//   @media (max-width: 375px) {
//     top: 70px;
//     // top: 150px;
//     left: 500px;
//   }

//   @media (max-width: 1024px) {
//     // top: 100px;
//     // // top: 100px;
//     // // left: 450px;
//     margin-top: 50px;
//   }
// `;

// export const WeatherHeader = () => {
//   const handleCityChange = (city: string) => {
//     console.log(city);
//   };

//   return (
//     <Container>
//       <StyledInputSearch>
//         <InputSearch onCityChange={handleCityChange} />
//       </StyledInputSearch>
//       <StyledTemperatureScale>
//         <TemperatureScaleToggle />
//       </StyledTemperatureScale>
//       <StyledTheme>
//         <ToggleTheme />
//       </StyledTheme>
//     </Container>
//   );
// };

import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Container = styled.div`
  display: flex; // Включено для использования Flexbox
  justify-content: space-around; // Распределяет пространство вокруг элементов
  align-items: center; // Выравнивает элементы по центру по вертикали
  box-sizing: border-box;
`;

const StyledInputSearch = styled.div`
  flex-grow: 1;
  // margin-right: auto;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const StyledTemperatureScale = styled.div`
  align-items: center;
  margin-left: auto; // Может быть не нужен для вашей цели
  margin-right: 0; // Указывает на отсутствие отступа справа
  margin-top: 32px;
  // padding-left: 30px;
`;

const StuledTheme = styled.div`
  padding-left: 30px;
`;

export const WeatherHeader = () => {
  const handleCityChange = (city: string) => {
    console.log(city);
  };

  return (
    <Container>
      <StyledInputSearch>
        <InputSearch onCityChange={handleCityChange} />
      </StyledInputSearch>
      <StyledTemperatureScale>
        <TemperatureScaleToggle />
      </StyledTemperatureScale>
      <StuledTheme>
        <ToggleTheme />
      </StuledTheme>
    </Container>
  );
};
