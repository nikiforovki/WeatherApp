import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'; // Убедитесь, что путь к ErrorBoundary указан правильно
import { useDispatch } from 'react-redux';
import {
  updateCity,
  fetchCurrentWeatherRequest,
  fetchWeatherDataByCityNameRequest,
} from '../../Redux/actions/actions';

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

export const InputSearch = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    return () => {
      // Очистка ресурсов, например, отписка от подписок
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const currentCity = inputValue;
      dispatch(updateCity(currentCity));
      dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
      dispatch({
        type: 'WORKER_GET_WEATHER_DATA_BY_SEARCH_REQUEST',
        payload: {
          cityName: currentCity,
          weatherUnit: 'metric',
        },
      });
      setInputValue(''); // Очищаем значение поля ввода
    }
  };

  return (
    <ErrorBoundary>
      <SearchContainer>
        <StyledInput
          name='myInput'
          placeholder='Введите текст...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <StyledIconSearch>
          <IconSearch />
        </StyledIconSearch>
      </SearchContainer>
    </ErrorBoundary>
  );
};
