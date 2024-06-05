import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';

interface InputSearchProps {
  onCityChange: (city: string) => void;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 38px;
  margin-left: 71px;
  width: 912px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
`;

const StyledInput = styled.input`
  position: fixed;
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 4px;
  width: 912px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
  padding-left: 30px;
  cursor: pointer; // Добавляем курсор указателя для удобства взаимодействия
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 890px;
  margin-top: 5px;
`;

const CitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  top: 80px;
  z-index: 100;
`;

const CityItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const [showCitiesList, setShowCitiesList] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCityChange(selectedCity);
      setShowCitiesList(false);
    }
  };

  const toggleCitiesList = () => {
    setShowCitiesList(!showCitiesList);
  };

  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск']; // Пример списка городов

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        onKeyPress={handleKeyPress}
        onClick={toggleCitiesList} // Добавляем обработчик событий onClick здесь
      />
      <StyledIconSearch onClick={toggleCitiesList}>
        <IconSearch />
      </StyledIconSearch>
      {showCitiesList && (
        <CitiesList>
          {cities.map((city, index) => (
            <CityItem
              key={index}
              onClick={() => {
                setSelectedCity(city);
                onCityChange(city);
                setShowCitiesList(false);
              }}
            >
              {city}
            </CityItem>
          ))}
        </CitiesList>
      )}
    </SearchContainer>
  );
};

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import IconSearch from '../../../public/assets/images/IconSearch';

// interface InputSearchProps {
//   onCityChange: (city: string) => void;
// }

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 38px;
//   margin-left: 71px;
//   width: 912px;
//   height: 27px;
//   box-sizing: border-box;
//   background-color: transparent;
// `;

// const StyledInput = styled.input`
//   position: fixed;
//   border-bottom: 1px solid #ffffff;
//   border-top: none;
//   border-left: none;
//   border-right: none;
//   border-radius: 4px;
//   width: 912px;
//   height: 27px;
//   box-sizing: border-box;
//   background-color: transparent;
//   padding-left: 30px;
//   cursor: pointer; // Добавляем курсор указателя для удобства взаимодействия
// `;

// const StyledIconSearch = styled.div`
//   position: fixed;
//   width: 20px;
//   height: 20px;
//   margin-left: 890px;
//   margin-top: 5px;
// `;

// const CitiesList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   position: absolute;
//   background-color: white;
//   border: 1px solid #ccc;
//   top: 80px;
//   z-index: 100;
// `;

// const CityItem = styled.li`
//   cursor: pointer;
//   padding: 8px 16px;
//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
//   const [showCitiesList, setShowCitiesList] = useState(false);
//   const [selectedCity, setSelectedCity] = useState('');

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       onCityChange(selectedCity);
//       setShowCitiesList(false);
//     }
//   };

//   const toggleCitiesList = () => {
//     setShowCitiesList(!showCitiesList);
//   };

//   const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск']; // Пример списка городов

//   return (
//     <SearchContainer>
//       <StyledInput
//         name='myInput'
//         placeholder='Введите текст...'
//         onKeyPress={handleKeyPress}
//         onClick={toggleCitiesList} // Добавляем обработчик событий onClick здесь
//       />
//       <StyledIconSearch onClick={toggleCitiesList}>
//         <IconSearch />
//       </StyledIconSearch>
//       {showCitiesList && (
//         <CitiesList>
//           {cities.map((city, index) => (
//             <CityItem
//               key={index}
//               onClick={() => {
//                 setSelectedCity(city);
//                 onCityChange(city);
//                 setShowCitiesList(false);
//               }}
//             >
//               {city}
//             </CityItem>
//           ))}
//         </CitiesList>
//       )}
//     </SearchContainer>
//   );
// };
