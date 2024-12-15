import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Snowflake from '../../../public/assets/images/Snowflake';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { InputSearch } from '../InputSearch/InputSearch';
import { useCustomDispatch } from '../../hooks/store';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/fetchCurrentWeatherRequest';
import { RootState } from '../../Redux/store/store';

const StyledToday = styled.div`
  position: fixed;
  top: 169px;
  left: 148px;
  width: 70px;
  height: 29px;
  font-size: 29px;
  color: #ffffff;
`;

const SnowflakeStyled = styled.div`
  position: fixed;
  width: 52px;
  height: 59px;
  top: 166px;
  left: 250px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const StyledDateDisplay = styled.div`
  position: fixed;
  width: 70px;
  height: 29px;
  top: 205px;
  left: 140px;
  font-size: 18px;
  color: #ffffff;
  white-space: nowrap;
`;

const StyledTemperature = styled.div`
  position: fixed;
  width: 86px;
  height: 108px;
  top: 240px;
  left: 140px;
  font-size: 80px;
  color: #ffffff;
  white-space: nowrap;
`;

const StyledMaterialLocation = styled.div`
  position: fixed;
  width: 16px;
  height: 23px;
  top: 387px;
  left: 110px;
`;

const StyledCyti = styled.div`
  position: fixed;
  width: 190px;
  height: 31px;
  top: 383px;
  left: 142px;
  font-size: 26px;
  color: #ffffff;
`;

const StyledNowText = styled.div`
  position: fixed;
  width: 46px;
  height: 26px;
  top: 212px;
  left: 504px;
  font-size: 22px;
  color: #ffffff;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNowFon = styled.div`
  position: fixed;
  width: 80px;
  height: 120px;
  top: 255px;
  left: 487px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 40px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNowTemperature = styled.div`
  position: fixed;
  width: 24px;
  height: 31px;
  left: 500px;
  top: 326px;
  font-size: 26px;
  color: rgba(255, 255, 255, 0.6);
`;

const StyledNowIcon = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  left: 500px;
  top: 271px;
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const error = useSelector((state: RootState) => state.error);
  const [currentCity, setCurrentCity] = useState('Berlin');

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchCurrentWeatherRequest(currentCity));
    }
  }, [dispatch, currentCity]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!weatherData) {
    return <div>Загрузка данных о погоде...</div>;
  }

  const currentTemperature = weatherData.main.temp - 273.15;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  console.log('Текущая температура:', currentTemperature);
  console.log('Город:', cityName);
  console.log('Страна:', country);

  return (
    <Container>
      <StyledToday>Today</StyledToday>
      <StyledDateDisplay>{currentDate}</StyledDateDisplay>
      <SnowflakeStyled>
        <Snowflake />
      </SnowflakeStyled>
      <StyledTemperature>{currentTemperature.toFixed(1)}°</StyledTemperature>
      <StyledMaterialLocation>
        <IconMaterialLocation />
      </StyledMaterialLocation>
      <StyledCyti>
        {cityName}, {country}
      </StyledCyti>
      <InputSearch onCityChange={setCurrentCity} />
      {/* Передаем setCurrentCity в проп onCityChange */}
      {/* Передаем setCurrentCity в проп onCityChange */}
      <StyledNowText>Now</StyledNowText>
      <StyledNowFon />
      <StyledNowIcon>
        <Snowflake />
      </StyledNowIcon>
      <StyledNowTemperature>
        {currentTemperature.toFixed(1)}°
      </StyledNowTemperature>
    </Container>
  );
};

export default TodayWeatherContainer;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux'; // Импортируем useDispatch и useSelector
// import { fetchCurrentWeather } from '../../Redux/slice/currentweatherSlice';
// import Snowflake from '../../../public/assets/images/Snowflake';
// import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
// import { InputSearch } from '../InputSearch/InputSearch';
// // import { fetchCurrentWeather } from '../../Redux/thunks/featchCurrentWeather';
// import { useCustomDispatch } from '../../hooks/store';
//
// const StyledToday = styled.div`
//   position: fixed;
//   top: 169px;
//   left: 148px;
//   width: 70px;
//   height: 29px;
//   font-size: 29px;
//   color: #ffffff;
// `;
//
// const SnowflakeStyled = styled.div`
//   position: fixed;
//   width: 52px;
//   height: 59px;
//   top: 166px;
//   left: 250px;
// `;
//
// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   position: relative;
// `;
//
// const StyledDateDisplay = styled.div`
//   position: fixed;
//   width: 70px;
//   height: 29px;
//   top: 205px;
//   left: 140px;
//   font-size: 18px;
//   color: #ffffff;
//   white-space: nowrap;
// `;
//
// const StyledTemperature = styled.div`
//   position: fixed;
//   width: 86px;
//   height: 108px;
//   top: 240px;
//   left: 140px;
//   font-size: 80px;
//   color: #ffffff;
//   white-space: nowrap;
// `;
//
// const StyledMaterialLocation = styled.div`
//   position: fixed;
//   width: 16px;
//   height: 23px;
//   top: 387px;
//   left: 110px;
// `;
//
// const StyledCyti = styled.div`
//   position: fixed;
//   width: 190px;
//   height: 31px;
//   top: 383px;
//   left: 142px;
//   font-size: 26px;
//   color: #ffffff;
// `;
//
// const StyledNowText = styled.div`
//   position: fixed;
//   width: 46px;
//   height: 26px;
//   top: 212px;
//   left: 504px;
//   font-size: 22px;
//   color: #ffffff;
// `;
//
// const StyledNowFon = styled.div`
//   position: fixed;
//   width: 80px;
//   height: 120px;
//   top: 255px;
//   left: 487px;
//   background-color: rgba(255, 255, 255, 0.6);
//   border-radius: 40px;
//   //
// `;
//
// const StyledNowTemperature = styled.div`
//   position: fixed;
//   width: 24px;
//   height: 31px;
//   left: 500px;
//   top: 326px;
//   font-size: 26px;
//   color: rgba(255, 255, 255, 0.6);
// `;
//
// const StyledNowIcon = styled.div`
//   position: fixed;
//   width: 20px;
//   height: 20px;
//   left: 500px;
//   top: 271px;
// `;
//
// const TodayWeatherContainer = () => {
//   const dispatch = useDispatch();
//   const weatherData = useSelector((state) => state.currentWeather);
//   const error = useSelector((state) => state.currentWeather.error);
//
//   const [searchCity, setSearchCity] = useState('Berlin');
//
//   useEffect(() => {
//     dispatch(fetchCurrentWeather({ city: searchCity }));
//   }, [dispatch, searchCity]);
//
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'short',
//   });
//
//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }
//
//   if (!weatherData) {
//     return <div>Загрузка данных о погоде...</div>;
//   }
//
//   const currentTemperature = weatherData.main?.temp
//     ? weatherData.main.temp - 273.15
//     : 0;
//
//   // Вывод данных в консоль
//   console.log('weatherData:', weatherData);
//   console.log('error:', error);
//   console.log('currentTemperature:', currentTemperature);
//   console.log('cityName:', weatherData.name);
//   console.log('country:', weatherData.sys?.country);
//
//   const cityName = weatherData.name;
//   const country = weatherData.sys?.country;
//
//   return (
//     <Container>
//       <StyledToday>Today</StyledToday>
//       <StyledDateDisplay>{currentDate}</StyledDateDisplay>
//       <SnowflakeStyled>
//         <Snowflake />
//       </SnowflakeStyled>
//       <StyledTemperature>{currentTemperature.toFixed(1)}°</StyledTemperature>
//       <StyledMaterialLocation>
//         <IconMaterialLocation />
//       </StyledMaterialLocation>
//       <StyledCyti>
//         {cityName}, {country}
//       </StyledCyti>
//       <InputSearch onCityChange={setSearchCity} />
//       <StyledNowText>Now</StyledNowText>
//       <StyledNowFon />
//       <StyledNowIcon>
//         <Snowflake />
//       </StyledNowIcon>
//       <StyledNowTemperature>
//         {currentTemperature.toFixed(1)}°
//       </StyledNowTemperature>
//     </Container>
//   );
// };
//
// export default TodayWeatherContainer;
