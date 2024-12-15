import React, { useRef, useState, useEffect } from 'react';
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

  @media (min-width: 375px) and (max-width: 768px) {
    font-size: 16px;
    width: 150px;
    height: 27px;
    margin-left: 70px;
    margin-top: -320px;

    z-index: 101;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
    width: 70%;
    height: 27px;
    left: 20px;
    top: 38px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    font-size: 16px;
    width: 600px;
    height: 27px;
    left: 71px;
    top: 38px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    font-size: 16px;
    width: 912px;
    height: 27px;
    left: 71px;
    top: 32px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
    width: 912px;
    height: 27px;
    left: 20px;
  }
`;

const StyledIconSearch = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;

  @media (min-width: 375px) and (max-width: 768px) {
    left: 200px;
    top: 50px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    left: 550px;
    top: 50px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 671px;
    top: 50px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 962px;
    top: 32px;
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

  @media (min-width: 375px) and (max-width: 768px) {
    width: 150px;
    left: 20px;
    top: 80px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 70%;
    left: 20px;
    top: 80px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    width: 600px;
    left: 71px;
    top: 80px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    width: 912px;
    left: 71px;
    top: 80px;
  }
  @media (min-width: 1920px) {
    width: 912px;
    left: 71px;
    top: 80px;
  }
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
  const [cities, setCities] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(inputValue)}&limit=5&appid=YOUR_API_KEY`,
        );
        setCities(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка городов:', error);
      }
    };

    if (inputValue.length > 0) {
      fetchCities();
    }

    return () => {};
  }, [inputValue]);

  const handleCityChange = (city: string) => {
    console.log('Changing city to:', city); // Для отладки
    setInputValue(city);
    const timezone = getCityTimezone(city);
    onCityChange(city, timezone);
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

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        value={inputValue}
        onKeyPress={handleEnterKeyPress}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <StyledIconSearch>
        <IconSearch />
      </StyledIconSearch>
      {showDropdown && (
        <Dropdown ref={dropdownRef}>
          {cities.map((city) => (
            <DropdownItem
              key={city.name}
              onClick={() => handleCityChange(city.name)}
            >
              {city.name}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SearchContainer>
  );
};
