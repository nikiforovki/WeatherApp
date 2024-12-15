import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectErrorMessage,
  selectCityNames,
} from '../../Redux/slice/currentweatherSlice';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';

import {
  updateCity,
  fetchCurrentWeatherRequest,
} from '../../Redux/actions/actions';

interface RootState {
  error: string | null;
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
  position: relative;
  z-index: 10;
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

const Dropdown = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.99);
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 200px;
  max-height: 200px;
  top: 80px;
  left: 71px;
`;

const CitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  background-color: white;
  border: 1px solid #ccc;
  left: 0;
  z-index: 100;
  width: 100%;
  max-height: ${hasCities ? '150px' : '0'}; /* Изменяем maxHeight */
  overflow-y: ${hasCities ? 'auto' : 'hidden'}; /* Изменяем overflow-y */
`;

// const CitiesList = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   margin: 0;
//   position: relative;
//   background-color: white;
//   border: 1px solid #ccc;
//   left: 0;
//   z-index: 100;
//   width: 100%;
//   max-height: 150px;
//   overflow-y: auto;
// `;

const CityItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: #20d1bc;
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

export const InputSearch: React.FC = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = useSelector(selectCityNames);

  // Инициализируем hasCities с false, чтобы избежать ошибки ReferenceError
  const [hasCities, setHasCities] = useState(false);

  const filteredCities = useMemo(
    () =>
      cities.filter((city) =>
        city.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue, cities],
  );

  useEffect(() => {
    setHasCities(filteredCities.length > 0);
  }, [filteredCities]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCityChange = useCallback(
    (city: string) => {
      setInputValue(city);
      dispatch(updateCity(city));
      dispatch(fetchCurrentWeatherRequest({ city }));
      dispatch({
        type: 'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
        payload: {
          cityName: city,
          weatherUnit: 'metric',
        },
      });
      setShowDropdown(false);
      setInputValue('');
    },
    [dispatch],
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCityChange(inputValue);
      }
    },
    [inputValue, handleCityChange],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setShowDropdown(true);
      dispatch({
        type: 'FETCH_CITY_LIST_REQUEST',
        payload: event.target.value,
      });
    },
    [dispatch],
  );

  const handleFocus = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }, []);

  return (
    <>
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
      </SearchContainer>
      {showDropdown &&
        hasCities && ( // Проверяем, что showDropdown и hasCities истинны
          <Dropdown ref={dropdownRef}>
            <CitiesList>
              {filteredCities.map((city) => (
                <CityItem key={city} onClick={() => handleCityChange(city)}>
                  {city}
                </CityItem>
              ))}
            </CitiesList>
          </Dropdown>
        )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
