import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import {
  selectErrorMessage,
  selectCityNames,
} from '../../Redux/slice/currentweatherSlice';
import {
  updateCity,
  fetchCurrentWeatherRequest,
} from '../../Redux/actions/actions';

export interface InputSearchProps {
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
  background-color: ffffff;
  z-index: 10;
  @media (max-width: 375px) {
    width: 280px;
    margin-left: 10px;
  }

  @media (max-width: 1024px) {
    width: 380px;
    margin-left: 10px;
  }
`;

const StyledInput = styled.input`
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 4px;
  width: 912px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.6

  &:focus {
    color: #ffffff;
  }

  &::placeholder {
    color: var(--input-text-color, #FFFFFF99)
    font-family: 'Helvetica Neue', sans-serif;
  }

    @media (max-width: 375px) {
    width: 280px;
    margin-left: auto;
    
  }

  @media (max-width: 1024px) {
    width: 580px;
    margin-left: auto;
    
  
  }

`;

const StyledIconSearch = styled.div`
  // position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 890px;
  margin-top: 5px;

  @media (max-width: 375px) {
    margin-left: 250px;
  }

  @media (max-width: 1024px) {
    margin-left: 350px;
  }
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
  max-height: 150px;
  overflow-y: auto;
`;

const CityItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: #20d1bc;
  }
`;

const ErrorMessage = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  text-align: center;
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = useSelector(selectCityNames);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const filteredCities = useMemo(
    () =>
      cities.filter((city: string) =>
        city.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue, cities],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityChange = useCallback(
    (city: string) => {
      console.log('handleCityChange called with:', city);
      dispatch(updateCity(city));
      dispatch(fetchCurrentWeatherRequest({ city }));
      dispatch({
        type: 'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
        payload: { cityName: city, weatherUnit: 'metric' },
      });
      setShowDropdown(false);
      setInputValue('');
    },
    [dispatch],
  );

  useEffect(() => {
    if (isFirstRender) {
      const defaultCity = 'Berlin';
      console.log(`Setting default city to ${defaultCity}`);
      handleCityChange(defaultCity);
      setIsFirstRender(false);
    }
  }, [isFirstRender, handleCityChange]);

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

  const handleFocus = useCallback(() => setShowDropdown(false), []);
  const handleBlur = useCallback(
    () => setTimeout(() => setShowDropdown(false), 200),
    [],
  );

  return (
    <>
      <SearchContainer>
        <StyledInput
          name='myInput'
          placeholder='E.G. Warsaw'
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
      {showDropdown && filteredCities.length > 0 && (
        <Dropdown ref={dropdownRef}>
          <CitiesList>
            {filteredCities.map((city: string) => (
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

export default InputSearch;
