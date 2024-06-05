import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import IconСloudСomputing from '../../../public/assets/images/IconСloudСomputing.svg';
import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';

const Container = styled.div`
  position: fixed;
  top: 255px;
  left: 591px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (max-width: 1020px) {
    left: 381px;
  }
`;

const WeatherCard = styled.div`
  position: relative;
  width: 80px;
  height: 120px;
  background-color: rgba(26, 32, 33, 0.3);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledBoxText = styled.div`
  position: absolute;
  width: 80px;
  height: 20px;
  top: 0;
  font-size: 22px;
  // color: #ffffff;
  color: var(--box-text-color, #ffffff);
`;

const StyledTime = styled.div`
  position: absolute;
  top: -40px;
  width: 63px;
  height: 26px;
  left: 10px;
  font-size: 22px;
  // color: #fdfdfd;
  color: var(--box-text-color, #ffffff);
`;

const StyledTemperature = styled.div`
  position: absolute;
  width: 34px;
  height: 31px;
  top: 80px;
  left: 25px;
  font-size: 26px;
  // color: #fdfdfd;
  color: var(--temperature-text-color, #ffffff);
`;

const StyledIconСloudСomputing = styled.div`
  position: absolute;
  top: 20px;
  left: 10px;
  width: 59px;
  height: 42px;
`;

const HourlyWeatherForecast = () => {
  const dispatch = useDispatch();
  const hourlyData = useSelector(selectHourlyData);
  const hourlyTemp = useSelector(selectHourlyTemp);
  const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C'); // Шкала температуры по умолчанию

  const firstSevenTemps = hourlyTemp.slice(0, 7);
  const firstSevenTempsCelsius = firstSevenTemps.map((temp) =>
    Math.floor(temp),
  );
  const firstSevenTempsFahrenheit = firstSevenTemps.map((temp) =>
    Math.floor((temp * 9) / 5 + 32),
  ); // Конвертация в Ф

  useEffect(() => {
    if (hourlyTemp && hourlyTemp.length >= 7) {
      const temps =
        temperatureScale === 'C'
          ? firstSevenTempsCelsius
          : firstSevenTempsFahrenheit;
      setForecastData([
        { time: '12 pm', temperature: temps[0] },
        { time: '1 pm', temperature: temps[1] },
        { time: '2 pm', temperature: temps[2] },
        { time: '3 pm', temperature: temps[3] },
        { time: '4 pm', temperature: temps[4] },
        { time: '5 pm', temperature: temps[5] },
        { time: '6 pm', temperature: temps[6] },
      ]);
    }
  }, [hourlyTemp, temperatureScale]); // Добавляем зависимость от temperatureScale

  useEffect(() => {
    console.log('forecastData:', forecastData);
  }, [forecastData]);

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return <SunIcon />;
      case 'few clouds':
        return <WeatherIcon />;
      case 'scattered clouds':
        return <WeatherIcon />;
      case 'broken clouds':
        return <WeatherIcon />;
      case 'shower rain':
        return <Snowflake />;
      case 'rain':
        return <Snowflake />;
      case 'thunderstorm':
        return <WeatherIcon />;
      case 'snow':
        return <Snowflake />;
      default:
        return <WeatherIcon />;
    }
  };

  return (
    <Container>
      <TemperatureScaleToggle
        onScaleChange={(scale) => setTemperatureScale(scale)}
      />{' '}
      {/* Компонент переключения шкалы температуры */}
      {forecastData.map((item, index) => (
        <WeatherCard key={index}>
          <StyledBoxText>
            <StyledTime>{item.time}</StyledTime>
            <StyledTemperature>{`${item.temperature}${temperatureScale === 'C' ? '°C' : '°F'}`}</StyledTemperature>
            <StyledIconСloudСomпутинг>
              {hourlyData && getWeatherIcon(hourlyData)}
            </StyledIconСloudСomпутинг>
          </StyledBoxText>
        </WeatherCard>
      ))}
    </Container>
  );
};

export default HourlyWeatherForecast;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import axios from 'axios';
// import IconСloudСomputing from '../../../public/assets/images/IconСloudСomputing.svg';
// import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
// import Snowflake from '../../../public/assets/images/Snowflake';
// import WeatherIcon from '../../../public/assets/images/WeatherIcon';
// import SunIcon from '../../../public/assets/images/SunIcon';
// import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
// import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';

// const Container = styled.div`
//   position: fixed;
//   top: 255px;
//   left: 591px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 24px;

//   @media (max-width: 1020px) {
//     left: 381px;
//   }
// `;

// const WeatherCard = styled.div`
//   position: relative;
//   width: 80px;
//   height: 120px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledBoxText = styled.div`
//   position: absolute;
//   width: 80px;
//   height: 20px;
//   top: 0;
//   font-size: 22px;
//   // color: #ffffff;
//   color: var(--box-text-color, #ffffff);
// `;

// const StyledTime = styled.div`
//   position: absolute;
//   top: -40px;
//   width: 63px;
//   height: 26px;
//   left: 10px;
//   font-size: 22px;
//   // color: #fdfdfd;
//   color: var(--box-text-color, #ffffff);
// `;

// const StyledTemperature = styled.div`
//   position: absolute;
//   width: 34px;
//   height: 31px;
//   top: 80px;
//   left: 25px;
//   font-size: 26px;
//   // color: #fdfdfd;
//   color: var(--temperature-text-color, #ffffff);
// `;

// const StyledIconСloudСomputing = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 10px;
//   width: 59px;
//   height: 42px;
// `;

// const HourlyWeatherForecast = () => {
//   const hourlyData = useSelector(selectHourlyData);
//   // console.log('ЧАсыИкан', hourlyData);

//   const [forecastData, setForecastData] = useState([]);

//   const hourlyTemp = useSelector(selectHourlyTemp);
//   // console.log('ЧАсыТемпература', hourlyTemp);

//   const firstSevenTemps = hourlyTemp.slice(0, 7);

//   const firstSevenTempsCelsius = firstSevenTemps.map((hourlyTemp) =>
//     Math.floor(hourlyTemp),
//   );
//   console.log('Первые семь температур в Цельсиях:', firstSevenTempsCelsius);

//   useEffect(() => {
//     if (hourlyTemp && hourlyTemp.length >= 7) {
//       const firstSevenTemps = hourlyTemp.slice(0, 7);
//       setForecastData([
//         { time: '12 pm', temperature: firstSevenTempsCelsius[0] },
//         { time: '1 pm', temperature: firstSevenTempsCelsius[1] },
//         { time: '2 pm', temperature: firstSevenTempsCelsius[2] },
//         { time: '3 pm', temperature: firstSevenTempsCelsius[3] },
//         { time: '4 pm', temperature: firstSevenTempsCelsius[4] },
//         { time: '5 pm', temperature: firstSevenTempsCelsius[5] },
//         { time: '6 pm', temperature: firstSevenTempsCelsius[6] },
//       ]);
//     }
//   }, [hourlyTemp]);

//   useEffect(() => {
//     console.log('forecastData:', forecastData);
//   }, [forecastData]);

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
//       {forecastData.map((item, index) => (
//         <WeatherCard key={index}>
//           <StyledBoxText>
//             <StyledTime>{item.time}</StyledTime>
//             <StyledTemperature>{item.temperature}°</StyledTemperature>
//             <StyledIconСloudСomputing>
//               {hourlyData && getWeatherIcon(hourlyData)}
//             </StyledIconСloudСomputing>
//           </StyledBoxText>
//         </WeatherCard>
//       ))}
//     </Container>
//   );
// };

// export default HourlyWeatherForecast;
