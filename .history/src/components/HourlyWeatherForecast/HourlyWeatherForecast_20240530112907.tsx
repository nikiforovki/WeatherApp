import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

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
  const hourlyData = useSelector(selectHourlyData);
  const hourlyTemp = useSelector(selectHourlyTemp);
  const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C'); // Шкала температуры
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (hourlyTemp && Array.isArray(hourlyTemp) && hourlyTemp.length >= 7) {
      const firstSevenTemps = hourlyTemp.slice(0, 7);
      const convertedTemps = firstSevenTemps.map((temp) =>
        temperatureScale === 'C'
          ? Math.floor(temp)
          : Math.round((temp * 9) / 5 + 32),
      );
      const formattedForecastData = firstSevenTemps.map((temp, index) => ({
        time: `${index + 12} pm`,
        temperature: convertedTemps[index],
      }));
      setForecastData(formattedForecastData);
    }
  }, [hourlyTemp, temperatureScale]);

  const convertCelsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

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
      <TemperatureScaleToggle onScaleChange={setTemperatureScale} />{' '}
      {forecastData.map((item, index) => (
        <WeatherCard key={index}>
          <StyledBoxText>
            <StyledTime>{item.time}</StyledTime>
            <StyledTemperature>{item.temperature}°</StyledTemperature>
            <StyledIconСloudСomputing>
              {hourlyData && getWeatherIcon(hourlyData)}
            </StyledIconСloudСomputing>
          </StyledBoxText>
        </WeatherCard>
      ))}
    </Container>
  );
};

export default HourlyWeatherForecast;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import Snowflake from '../../../public/assets/images/Snowflake';
// import WeatherIcon from '../../../public/assets/images/WeatherIcon';
// import SunIcon from '../../../public/assets/images/SunIcon';
// import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
// import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';
// import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';

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
//   const hourlyTemp = useSelector(selectHourlyTemp);
//   const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C'); // Шкала температуры
//   const [forecastData, setForecastData] = useState([]);

//   useEffect(() => {
//     if (hourlyTemp && Array.isArray(hourlyTemp) && hourlyTemp.length >= 7) {
//       const firstSevenTemps = hourlyTemp.slice(0, 7);
//       const convertedTemps = firstSevenTemps.map((temp) =>
//         temperatureScale === 'C'
//           ? Math.floor(temp)
//           : Math.round((temp * 9) / 5 + 32),
//       );
//       const formattedForecastData = firstSevenTemps.map((temp, index) => ({
//         time: `${index + 12} pm`,
//         temperature: convertedTemps[index],
//       }));
//       setForecastData(formattedForecastData);
//     }
//   }, [hourlyTemp, temperatureScale]);

//   const convertCelsiusToFahrenheit = (celsius: number) => {
//     return Math.round((celsius * 9) / 5 + 32);
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
//       <TemperatureScaleToggle onScaleChange={setTemperatureScale} />{' '}
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
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
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

//   const [forecastData, setForecastData] = useState([]);

//   const hourlyTemp = useSelector(selectHourlyTemp);

//   const firstSevenTemps = hourlyTemp.slice(0, 7);

//   const firstSevenTempsCelsius = firstSevenTemps.map(
//     (hourlyTemp) => Math.floor(hourlyTemp),
//     console.log('температур:', hourlyTemp),
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
