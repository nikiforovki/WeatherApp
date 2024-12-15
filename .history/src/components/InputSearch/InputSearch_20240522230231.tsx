import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import axios from 'axios';

interface City {
  geonameId: number;
  name: string;
  countryCode: string;
}

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
  cursor: pointer;
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
  max-height: 200px; // Максимальная высота списка
  overflow-y: auto; // Позволяет прокручиваться по вертикали
  &::-webkit-scrollbar {
    width: 8px; // Ширина полосы прокрутки
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888; // Цвет полосы прокрутки
    border-radius: 4px; // Радиус границ полосы прокрутки
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; // Цвет трека полосы прокрутки
  }
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
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        'http://api.geonames.org/searchJSON?q=Moscow,Russia&maxRows=10&username=nzkmsk',
      );
      setCities(response.data.geonames);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCityChange(selectedCity);
      setShowCitiesList(false);
    }
  };

  const toggleCitiesList = () => {
    setShowCitiesList(!showCitiesList);
  };

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        onKeyPress={handleKeyPress}
        onClick={toggleCitiesList}
      />
      <StyledIconSearch onClick={toggleCitiesList}>
        <IconSearch />
      </StyledIconSearch>
      {showCitiesList && (
        <CitiesList>
          {cities.map((city) => (
            <CityItem
              key={city.geonameId.toString()}
              onClick={() => {
                setSelectedCity(city.name);
                onCityChange(city.name);
                setShowCitiesList(false);
              }}
            >
              {city.name}
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

// http://api.geonames.org/searchJSON?q=Tokyo&maxRows=10&username=nzkmsk
