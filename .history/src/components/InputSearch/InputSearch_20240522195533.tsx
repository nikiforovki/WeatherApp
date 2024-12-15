import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 890px;
  margin-top: 5px;
`;

const CityListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
`;

const CityListItem = styled.div`
  padding: 8px;
  cursor: pointer;
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [showCityList, setShowCityList] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCityChange(event.currentTarget.value);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setCities([]);
      setShowCityList(false);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${REACT_APP_API_KEY}`,
        );
        setCities(response.data.map((item) => item.name));
        setShowCityList(true);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, [searchTerm]);

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        onKeyPress={handleKeyPress}
      />
      {showCityList && (
        <CityListContainer>
          {cities.map((city, index) => (
            <CityListItem key={index} onClick={() => onCityChange(city)}>
              {city}
            </CityListItem>
          ))}
        </CityListContainer>
      )}
      <StyledIconSearch>
        <IconSearch />
      </StyledIconSearch>
    </SearchContainer>
  );
};
