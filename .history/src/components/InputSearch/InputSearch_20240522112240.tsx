import React from 'react';
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

  const getCityTimezone = (city: string): string => {
    switch (city) {
      case 'Москва':
        return 'Europe/Moscow';
      case 'Казань':
        return 'Europe/Kazan';
      default:
        return 'UTC';
    }
  };

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
