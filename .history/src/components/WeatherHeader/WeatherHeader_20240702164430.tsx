import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const StyledInputSearch = styled.div`
  flex-grow: 1;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const StyledTemperatureScale = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  // Удален margin-top: 32px;
`;

const StyledTheme = styled.div`
  display: flex;
  align-items: center;
  // Добавлены необходимые стили для выравнивания
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
      <StyledTheme>
        <ToggleTheme />
      </StyledTheme>
    </Container>
  );
};

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
//   box-sizing: border-box;
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
// const StuledTheme = styled.div``;

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
//       <StuledTheme>
//         <ToggleTheme />
//       </StuledTheme>
//     </Container>
//   );
// };
