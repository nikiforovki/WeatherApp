import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/fetchCurrentWeatherRequest';
import { RootState } from '../../Redux/store/store';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
import { selectTemperature } from '../../Redux/slice/currentweatherSlice';
import { selectCity } from '../../Redux/slice/currentweatherSlice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const StyledToday = styled.div`
  position: fixed;
  top: 169px;
  left: 148px;
  width: 70px;
  height: 29px;
  font-size: 29px;
  color: var(--today-text-color, #ffffff);
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
  // color: #ffffff;
  color: var(--dataToday-text-color, #ffffff);
  white-space: nowrap;
`;

const StyledTemperature = styled.div`
  position: fixed;
  width: 86px;
  height: 108px;
  top: 240px;
  left: 178px;
  font-size: 80px;
  color: var(--temperature-text-color, #ffffff);
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
  color: var(--text-color-city);
`;

const StyledNowText = styled.div`
  position: fixed;
  width: 46px;
  height: 26px;
  top: 212px;
  left: 504px;
  font-size: 22px;
  color: var(--now-text-color);
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
  left: 509px;
  top: 336px;
  font-size: 26px;
  color: var(--temperature-now-text-color);
`;

const StyledNowIcon = styled.div`
  position: fixed;
  width: 37px;
  height: 42px;
  left: 500px;
  top: 271px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const error = useSelector((state: RootState) => state.error);
  const [currentCity, setCurrentCity] = useState('Berlin');
  const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C');
  console.log('Переключение Today', setTemperatureScale);
  const descriptionIcon = useSelector(selectDescriptionIcon);
  console.log('Код иконки:', descriptionIcon);
  const TemperatureToday = useSelector(selectTemperature);
  console.log('Температура Today', TemperatureToday);
  const city = useSelector(selectCity);

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
    console.error('Ошибка:', error);
    return <div>Ошибка: {error}</div>;
  }

  const convertCelsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const displayTemperature = () => {
    if (temperatureScale === 'C') {
      return Math.floor(TemperatureToday);
    } else if (temperatureScale === 'F') {
      return convertCelsiusToFahrenheit(TemperatureToday);
    } else {
      return Math.floor(TemperatureToday);
    }
  };

  const getWeatherIconUrl = (iconCode) => {
    // Форматируем код иконки согласно конвенции OpenWeatherMap
    const formattedCode = `${iconCode.slice(0, 2)}d`;
    return `https://openweathermap.org/img/w/${formattedCode}.png`;
  };

  return (
    <Container>
      <StyledToday>Today</StyledToday>
      <StyledDateDisplay>{currentDate}</StyledDateDisplay>
      <SnowflakeStyled>
        {descriptionIcon && getWeatherIcon(descriptionIcon)}
      </SnowflakeStyled>
      <StyledTemperature>{displayTemperature()}°</StyledTemperature>
      <StyledMaterialLocation>
        <IconMaterialLocation />
      </StyledMaterialLocation>
      <StyledCyti>{city}</StyledCyti>
      <StyledNowText>Now</StyledNowText>
      <StyledNowFon />
      <StyledNowIcon>
        {descriptionIcon && getWeatherIcon(descriptionIcon)}
      </StyledNowIcon>
      <TemperatureScaleToggle onScaleChange={setTemperatureScale} />
      <StyledNowTemperature>{displayTemperature()}°</StyledNowTemperature>
    </Container>
  );
};

export default TodayWeatherContainer;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import Snowflake from '../../../public/assets/images/Snowflake';
// import WeatherIcon from '../../../public/assets/images/WeatherIcon';
// import SunIcon from '../../../public/assets/images/SunIcon';
// import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
// import { fetchCurrentWeatherRequest } from '../../Redux/actions/fetchCurrentWeatherRequest';
// import { RootState } from '../../Redux/store/store';
// import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
// import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
// import { selectTemperature } from '../../Redux/slice/currentweatherSlice';
// import { selectCity } from '../../Redux/slice/currentweatherSlice';

// const StyledToday = styled.div`
//   position: fixed;
//   top: 169px;
//   left: 148px;
//   width: 70px;
//   height: 29px;
//   font-size: 29px;
//   // color: #ffffff;
//   color: var(--today-text-color, #ffffff);
// `;

// const SnowflakeStyled = styled.div`
//   position: fixed;
//   width: 52px;
//   height: 59px;
//   top: 166px;
//   left: 250px;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   position: relative;
// `;

// const StyledDateDisplay = styled.div`
//   position: fixed;
//   width: 70px;
//   height: 29px;
//   top: 205px;
//   left: 140px;
//   font-size: 18px;
//   // color: #ffffff;
//   color: var(--dataToday-text-color, #ffffff);
//   white-space: nowrap;
// `;

// const StyledTemperature = styled.div`
//   position: fixed;
//   width: 86px;
//   height: 108px;
//   top: 240px;
//   left: 140px;
//   font-size: 80px;
//   // color: #ffffff;
//   color: var(--temperature-text-color, #ffffff);
//   white-space: nowrap;
// `;

// const StyledMaterialLocation = styled.div`
//   position: fixed;
//   width: 16px;
//   height: 23px;
//   top: 387px;
//   left: 110px;
// `;

// const StyledCyti = styled.div`
//   position: fixed;
//   width: 190px;
//   height: 31px;
//   top: 383px;
//   left: 142px;
//   font-size: 26px;
//   // color: #ffffff;
//   color: var(--text-color-city);
// `;

// const StyledNowText = styled.div`
//   position: fixed;
//   width: 46px;
//   height: 26px;
//   top: 212px;
//   left: 504px;
//   font-size: 22px;
//   // color: #ffffff;
//   color: var(--now-text-color);
// `;

// const StyledNowFon = styled.div`
//   position: fixed;
//   width: 80px;
//   height: 120px;
//   top: 255px;
//   left: 487px;
//   background-color: rgba(255, 255, 255, 0.6);
//   border-radius: 40px;

//   @media (max-width: 1024px) {
//     display: none;
//   }
// `;

// const StyledNowTemperature = styled.div`
//   position: fixed;
//   width: 24px;
//   height: 31px;
//   left: 500px;
//   top: 336px;
//   font-size: 26px;
//   // color: rgba(255, 255, 255, 0.6);
//   color: var(--temperature-now-text-color);
// `;

// const StyledNowIcon = styled.div`
//   position: fixed;
//   width: 20px;
//   height: 20px;
//   left: 500px;
//   top: 271px;
//   @media (max-width: 1024px) {
//     display: none;
//   }
// `;

// const TodayWeatherContainer: React.FC = () => {
//   const dispatch = useDispatch();
//   const weatherData = useSelector((state: RootState) => state.weatherData);
//   const error = useSelector((state: RootState) => state.error);
//   const [currentCity, setCurrentCity] = useState('Berlin');
//   const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C');
//   const descriptionIcon = useSelector(selectDescriptionIcon);
//   const TemperatureToday = useSelector(selectTemperature);
//   const city = useSelector(selectCity);

//   useEffect(() => {
//     if (currentCity) {
//       dispatch(fetchCurrentWeatherRequest(currentCity));
//     }
//   }, [dispatch, currentCity]);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'short',
//   });

//   if (error) {
//     console.error('Ошибка:', error);
//     return <div>Ошибка: {error}</div>;
//   }

//   const convertCelsiusToFahrenheit = (celsius: number) => {
//     return Math.round((celsius * 9) / 5 + 32);
//   };

//   const displayTemperature = () => {
//     if (temperatureScale === 'C') {
//       return Math.floor(TemperatureToday);
//     } else if (temperatureScale === 'F') {
//       return convertCelsiusToFahrenheit(TemperatureToday);
//     } else {
//       return Math.floor(TemperatureToday);
//     }
//   };

//   const getWeatherIcon = (description: string) => {
//     switch (description) {
//       case 'clear sky':
//         return <SunIcon />;
//       case 'few clouds':
//         return <WeatherIcon />;
//       case 'scattered clouds':
//         return <WeatherIcon />;
//       case 'broken clouds':
//         return <WeatherIcon />;
//       case 'shower rain':
//         return <Snowflake />;
//       case 'rain':
//         return <Snowflake />;
//       case 'thunderstorm':
//         return <WeatherIcon />;
//       case 'snow':
//         return <Snowflake />;
//       default:
//         return <WeatherIcon />;
//     }
//   };

//   return (
//     <Container>
//       <StyledToday>Today</StyledToday>
//       <StyledDateDisplay>{currentDate}</StyledDateDisplay>
//       <SnowflakeStyled>
//         {descriptionIcon && getWeatherIcon(descriptionIcon)}
//       </SnowflakeStyled>
//       <StyledTemperature>{displayTemperature()}°</StyledTemperature>
//       <StyledMaterialLocation>
//         <IconMaterialLocation />
//       </StyledMaterialLocation>
//       <StyledCyti>{city}</StyledCyti>
//       <StyledNowText>Now</StyledNowText>
//       <StyledNowFon />
//       <StyledNowIcon>
//         {descriptionIcon && getWeatherIcon(descriptionIcon)}
//       </StyledNowIcon>
//       <TemperatureScaleToggle onScaleChange={setTemperatureScale} />
//       <StyledNowTemperature>{displayTemperature()}°</StyledNowTemperature>
//     </Container>
//   );
// };

// export default TodayWeatherContainer;
