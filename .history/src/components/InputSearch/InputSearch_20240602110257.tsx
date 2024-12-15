import React, { useState, useRef, useEffect } from 'react';
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
  position: relative;
`;

const StyledInput = styled.input`
  position: fixed;
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  background-color: transparent;
  color: #ffffff;
  /* Стили для разных размеров экрана */
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  /* Стили для разных размеров экрана */
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
  /* Стили для разных размеров экрана */
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const InputSearch: React.FC<InputSearchProps> = ({ onCityChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const cities = ['Москва', 'Казань'];
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

  const handleCityChange = (city: string) => {
    setInputValue(city);
    onCityChange(city);
    setShowDropdown(false);
    setInputValue('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  return (
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
  );
};
