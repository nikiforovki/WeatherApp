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
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  margin-left: 890px;
  margin-top: 5px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург']; // Пример списка городов

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCityChange(event.currentTarget.value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleDropdownClick = (city: string) => {
    onCityChange(city);
    setShowDropdown(false);
    setInputValue('');
  };

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        value={inputValue}
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
      />
      <StyledIconSearch>
        <IconSearch />
      </StyledIconSearch>
      {showDropdown && (
        <Dropdown>
          {cities
            .filter((city) =>
              city.toLowerCase().includes(inputValue.toLowerCase()),
            )
            .map((city) => (
              <div key={city} onClick={() => handleDropdownClick(city)}>
                {city}
              </div>
            ))}
        </Dropdown>
      )}
    </SearchContainer>
  );
};
