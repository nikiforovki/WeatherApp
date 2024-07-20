import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
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
  // height: 27px;
  box-sizing: border-box;
  background-color: ffffff;
  z-index: 10;

  @media (min-width: 320px) and (max-width: 375px) {
    width: 200px;
    margin-left: 10px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 150px;
    margin-left: 5px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 360px;
    margin-left: 70px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    margin-left: 10px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    margin-left: 71px;
  }

  @media (min-width: 1367px) {
    left: 71px;
  }
`;

const StyledInput = styled.input`
 width: 100%;
  transition: width 0.5s ease;
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 4px;
  height: 27px;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.6

  &:focus {
    color: #ffffff;
  };

  &::placeholder {
    color: var(--input-text-color, #FFFFFF99)
    font-family: 'Helvetica Neue', sans-serif;
  };

    @media (min-width: 320px) and (max-width: 374px) {
    width: 200px;
  };

  @media (min-width: 375px) and (max-width: 768px) {
    width: 600px;
  };
 @media (min-width: 769px) and (max-width: 879px) {
width: 800px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
 width: 800px;
  };

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 730px;
  };

    @media (min-width: 1295px) and (max-width: 1366px) {
    width: 912px;
  };

  @media (min-width: 1367px) {
    width: 912px;
  };

`;

const StyledIconSearch = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: -20px;
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

  @media (min-width: 375px) and (max-width: 768px) {
    left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    left: 71px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    left: 71px;
  }

  @media (min-width: 1367px) {
    left: 71px;
  }
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
  const debounceTimer = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = useMemo(
    () =>
      cities.filter((city: string) =>
        city.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue, cities],
  );

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

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        dispatch({
          type: 'FETCH_CITY_LIST_REQUEST',
          payload: event.target.value,
        });
      }, 1000);
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
