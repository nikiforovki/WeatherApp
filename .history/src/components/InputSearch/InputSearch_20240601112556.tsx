import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useDispatch } from 'react-redux';
import {
  updateCity,
  fetchCurrentWeatherRequest,
  fetchWeatherDataByCityNameRequest,
} from '../../Redux/actions/actions';

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
`;

const CityItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const Dropdown = styled.div`
  position: fixed;
  top: 50px;
  background-color: rgba(255, 255, 255, 0.99);
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  text-align: center;
`;

interface InputSearchProps {
  onCityChange: (city: string) => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = ['Москва', 'Казань'];
  const dropdownRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Логика очистки
  }, []);

  const handleCityChange = (city: string) => {
    setInputValue(city);
    onCityChange(city);
    setShowDropdown(false);
    setInputValue('');
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleCityChange(inputValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const currentCity = inputValue;
      dispatch(updateCity(currentCity));
      dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
      dispatch({
        type: 'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
        payload: {
          cityName: currentCity,
          weatherUnit: 'metric',
        },
      }).catch((error) => handleError(error.message)); // Обработка ошибок
      setInputValue('');
    }
  };

  return (
    <ErrorBoundary error={error}>
      <SearchContainer>
        <StyledInput
          name='myInput'
          placeholder='Введите текст...'
          value={inputValue}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <StyledIconSearch>
          <IconSearch />
        </StyledIconSearch>
        {showDropdown && (
          <Dropdown ref={dropdownRef}>
            {cities
              .filter((city) =>
                city.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((city) => (
                <DropdownItem key={city} onClick={() => handleCityChange(city)}>
                  {city}
                </DropdownItem>
              ))}
          </Dropdown>
        )}
      </SearchContainer>
    </ErrorBoundary>
  );
};

// import React, { useState } from 'react';

// import styled from 'styled-components';
// import IconSearch from '../../../public/assets/images/IconSearch';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
// import { useDispatch } from 'react-redux';
// import {
//   updateCity,
//   fetchCurrentWeatherRequest,
//   fetchWeatherDataByCityNameRequest,
// } from '../../Redux/actions/actions';

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
//   cursor: pointer;
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

// const ErrorMessage = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: red;
//   text-align: center;
// `;

// export const InputSearch = () => {
//   const dispatch = useDispatch();

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       const currentCity = event.target.value;
//       dispatch(updateCity(currentCity));
//       dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
//       dispatch({
//         type: 'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
//         payload: {
//           cityName: currentCity,
//           weatherUnit: 'metric',
//         },
//       });
//       event.target.value = '';
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <SearchContainer>
//         <StyledInput
//           name='myInput'
//           placeholder='Введите текст...'
//           onKeyPress={handleKeyPress}
//         />
//         <StyledIconSearch>
//           <IconSearch />
//         </StyledIconSearch>
//       </SearchContainer>
//     </ErrorBoundary>
//   );
// };
