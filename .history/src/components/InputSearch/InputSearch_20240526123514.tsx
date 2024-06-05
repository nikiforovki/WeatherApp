import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useDispatch } from 'react-redux';
import { updateCityAndTimezone } from '../../Redux/actions/actions';
import TimezoneDropdown from './TimezoneDropdown';

interface InputSearchProps {
  onCityChange: (city: string) => void;
  onError: (error: boolean) => void;
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
`;

const CityItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
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

const StyledTimezoneDropdown = styled.div`
  position: fixed;
  top: 150px;
  left: 71px;
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const dispatch = useDispatch();
  const [showCitiesList, setShowCitiesList] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [error, setError] = useState(false);

  const cities = [
    { name: 'Москва', timezone: 'Europe/Moscow' },
    { name: 'Санкт-Петербург', timezone: 'Europe/Moscow' },
    { name: 'Новосибирск', timezone: 'Asia/Novosibirsk' },
  ];
  const handleTimezoneChange = (timezone) => {
    dispatch(updateCityAndTimezone({ city: selectedCity, timezone }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const currentCity = event.currentTarget.value.toLowerCase();
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(currentCity),
      );

      if (filtered.length > 0) {
        const { name, timezone } = filtered[0];
        dispatch(updateCityAndTimezone({ city: name, timezone }));
        onCityChange({ city: name, timezone });
        setSelectedCity(name);
        setFilteredCities([]);
        setShowCitiesList(false);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const toggleCitiesList = () => {
    setShowCitiesList(!showCitiesList);
  };

  return (
    <ErrorBoundary>
      <SearchContainer>
        <StyledInput
          name='myInput'
          placeholder='Введите текст...'
          onChange={(e) => setSelectedCity(e.target.value)}
          onKeyPress={handleKeyPress}
          onClick={toggleCitiesList}
          value={selectedCity}
        />
        <StyledIconSearch onClick={toggleCitiesList}>
          <IconSearch />
        </StyledIconSearch>
        {showCitiesList && (
          <CitiesList>
            {filteredCities.map((city, index) => (
              <CityItem
                key={index}
                onClick={() => {
                  setSelectedCity(city.name);
                  onCityChange({ city: city.name, timezone: city.timezone });
                  setShowCitiesList(false);
                }}
              >
                {city.name}
              </CityItem>
            ))}
          </CitiesList>
        )}
        <TimezoneDropdown onChange={handleTimezoneChange} />
      </SearchContainer>
    </ErrorBoundary>
  );
};
