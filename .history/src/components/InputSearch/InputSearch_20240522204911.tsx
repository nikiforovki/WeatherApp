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
  const [showCitiesList, setShowCitiesList] = useState(false); // Состояние для управления видимостью списка городов
  const [selectedCity, setSelectedCity] = useState(''); // Состояние для хранения выбранного города

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCityChange(selectedCity); // Используйте selectedCity вместо event.currentTarget.value
      setShowCitiesList(false); // Скройте список после выбора города
    }
  };

  // Функция для открытия списка городов при нажатии на иконку поиска
  const toggleCitiesList = () => {
    setShowCitiesList(!showCitiesList);
  };

  // Пример списка городов, замените его на реальный список из вашего приложения
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];

  return (
    <SearchContainer>
      <StyledInput
        name='myInput'
        placeholder='Введите текст...'
        onKeyPress={handleKeyPress}
      />
      <StyledIconSearch onClick={toggleCitiesList}>
        <IconSearch />
      </StyledIconSearch>
      {/* Выпадающий список городов */}
      {showCitiesList && (
        <div
          style={{ backgroundColor: '#fff', position: 'absolute', zIndex: 10 }}
        >
          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCity(city);
                setShowCitiesList(false);
                onCityChange(city);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </SearchContainer>
  );
};
