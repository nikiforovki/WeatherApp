// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
// import { fetchWeatherDataByCityNameRequest } from '../../Redux/actions/actions';

// export const InputSearch = () => {
//   const dispatch = useDispatch();
//   const [city, setCity] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(
//       fetchWeatherDataByCityNameRequest({
//         cityName: city,
//         weatherUnit: 'metric', // или 'imperial' в зависимости от ваших потребностей
//       }),
//     );
//     setCity(''); // Очищаем поле ввода после отправки запроса
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type='text'
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         placeholder='Введите название города'
//       />
//       <button type='submit'>Получить погоду</button>
//     </form>
//   );
// };
import React, { useState } from 'react';
import styled from 'styled-components';
import IconSearch from '../../../public/assets/images/IconSearch';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
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
  width: 200px;
  height: 200px;
  top: 80px;
  left: 71px;
`;

// export const InputSearch = () => {
//   const dispatch = useDispatch();

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       const currentCity = event.target.value.toLowerCase();
//       dispatch(updateCity(currentCity));
//       dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
//       // Добавьте диспатч для инициирования запроса погоды по названию города
//       dispatch(
//         fetchWeatherDataByCityNameRequest({
//           cityName: currentCity,
//           weatherUnit: 'metric',
//         }),
//       );
//       event.target.value = '';
//     }
//   };

//   // const handleKeyPress = (event) => {
//   //   if (event.key === 'Enter') {
//   //     const currentCity = event.target.value.toLowerCase();
//   //     dispatch(updateCity(currentCity));
//   //     dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
//   //     event.target.value = '';
//   //   }
//   // };

//   return (
//     <ErrorBoundary>
//       <SearchContainer>
//         <StyledInput
//           name='myInput'
//           placeholder='Введите текст...'
//           onKeyPress={handleKeyPress}
//         />
//         <StyledIconSearch>
//           <IconSearch />
//         </StyledIconSearch>
//       </SearchContainer>
//     </ErrorBoundary>
//   );
// };
export const InputSearch = () => {
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const currentCity = event.target.value.toLowerCase();
      dispatch(updateCity(currentCity));
      dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
      dispatch(
        fetchWeatherDataByCityNameRequest({
          cityName: currentCity,
          weatherUnit: 'metric',
        }),
      );
      event.target.value = '';
    }
  };

  const handleChange = (event) => {
    const newCity = event.target.value.toLowerCase();
    dispatch(fetchCurrentWeatherRequest({ city: currentCity }));
    console.log('Value changed:', newCity);
  };

  return (
    <ErrorBoundary>
      <SearchContainer>
        <StyledInput
          name='myInput'
          placeholder='Введите текст...'
          onKeyPress={handleKeyPress}
          onChange={handleChange} // Добавлен обработчик onChange
        />
        <StyledIconSearch>
          <IconSearch />
        </StyledIconSearch>
      </SearchContainer>
    </ErrorBoundary>
  );
};
