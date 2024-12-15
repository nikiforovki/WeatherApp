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
  color: #ffffff;
`;

const StyledTime = styled.div`
  position: absolute;
  top: -40px;
  width: 63px;
  height: 26px;
  left: 0;
  font-size: 22px;
  color: #fdfdfd;
`;

const StyledTemperature = styled.div`
  position: absolute;
  width: 34px;
  height: 31px;
  top: 90px;
  left: 30px;
  font-size: 26px;
  color: #fdfdfd;
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
  console.log('ЧАсыИкан', hourlyData);
  // Инициализация состояния с использованием первой температуры
  const [forecastData, setForecastData] = useState([]);

  const hourlyTemp = useSelector(selectHourlyTemp);
  console.log('ЧАсыТемпература', hourlyTemp);

  // Извлечение первых семи элементов из массива
  const firstSevenTemps = hourlyTemp.slice(0, 7);
  console.log('Первые семь температур:', firstSevenTemps[0]);

  // const descriptionIcon = useSelector(selectDescriptionIcon);
  // console.log('иКОНКА в часах', descriptionIcon);
  // Используем useEffect для обновления forecastData при изменении hourlyTemp
  useEffect(() => {
    if (hourlyTemp && hourlyTemp.length >= 7) {
      const firstSevenTemps = hourlyTemp.slice(0, 7);
      setForecastData([
        { time: '12 pm', temperature: firstSevenTemps[0] },
        { time: '1 pm', temperature: firstSevenTemps[1] },
        { time: '2 pm', temperature: firstSevenTemps[2] },
        { time: '3 pm', temperature: firstSevenTemps[3] },
        { time: '4 pm', temperature: firstSevenTemps[4] },
        { time: '5 pm', temperature: firstSevenTemps[5] },
        { time: '6 pm', temperature: firstSevenTemps[6] },
      ]);
    }
  }, [hourlyTemp]);

  // Используем useEffect для вывода forecastData в консоль при изменении
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
      {forecastData.map((item, index) => (
        <WeatherCard key={index}>
          <StyledBoxText>
            <StyledTime>{item.time}</StyledTime>
            <StyledTemperature>{item.temperature}</StyledTemperature>
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

//Пример рабочий код

// import React, { useState, useEffect } from 'react';

// import styled from 'styled-components';
// import axios from 'axios';
// import IconСloudСomputing from '../../../public/assets/images/IconСloudСomputing.svg';

// const Container = styled.div`
//   position: fixed;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 20px;
//   top: 250px;
//   left: 850px;
// `;

// const WeatherCard = styled.div`
//   position: relative;
//   width: 80px;
//   height: 120px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   margin: 10px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   margin-right: 24px;
// `;

// const StyledBoxText = styled.div`
//   width: 80px;
//   height: 20px;
//   font-size: 22px;
//   color: #ffffff;
// `;

// const StyledTime = styled.div`
//   width: 63px;
//   height: 26px;
//   left: 600px;
//   font-size: 20px;
//   color: #fdfdfd;
// `;

// const StyledTemperature = styled.div`
//   position: relative;
//   width: 34px;
//   height: 31px;
//   top: 90px;
//   left: 30px;
//   font-size: 26px;
//   color: #fdfdfd;
// `;

// const StyledBoxFon = styled.div`
//   width: 80px;
//   height: 120px;
//   top: 255px;
//   left: 591px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   gap: 24px;

//   &:first-child {
//     margin-left: 71px;
//   }

//   &:nth-child(1) {
//     margin-top: 17px;
//   }

//   &:nth-child(2) {
//     margin-top: 17px;
//   }

//   &:nth-child(3) {
//     margin-top: 17px;
//   }

//   &:nth-child(4) {
//     margin-top: 17px;
//   }

//   &:nth-child(5) {
//     margin-top: 17px;
//   }

//   &:nth-child(6) {
//     margin-top: 17px;
//   }
// `;

// const StyledIconСloudСomputing = styled.div`
//   width: 59px;
//   height: 42px;
//   margin-left: 10px;
//   top: 271px;
// `;

// const HourlyWeatherForecast = () => {
//   const [forecastData, setForecastData] = useState([
//     { time: '12 pm', temperature: 20 },
//     { time: '1 pm', temperature: 20 },
//     { time: '2 pm', temperature: 20 },
//     { time: '3 pm', temperature: 20 },
//     { time: '4 pm', temperature: 20 },
//     { time: '5 pm', temperature: 20 },
//     { time: '6 pm', temperature: 20 },
//   ]);

//   useEffect(() => {
//     // const fetchWeatherData = async () => {
//     //   try {
//     //     const apiKey = 'f6ff5e7dcd656163a217302f41dc2916'; // Замените на ваш API ключ
//     //     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}`; // Замените на ваш URL API
//     //     const response = await axios.get(apiUrl);
//     //     const updatedForecastData = forecastData.map((item) => {
//     //       const forecastItem = response.data.forecast.find(
//     //         (forecast) => forecast.time === item.time,
//     //       );
//     //       return {
//     //         ...item,
//     //         temperature: forecastItem ? forecastItem.temperature : null,
//     //       };
//     //     });
//     //     setForecastData(updatedForecastData);
//     //   } catch (error) {
//     //     console.error('Ошибка при получении данных о погоде:', error);
//     //   }
//     // };
//     // fetchWeatherData();
//   }, []);

//   return (
//     <Container>
//       <WeatherCard>
//         {forecastData.map((item, index) => (
//           <div key={index}>
//             {/*<StyledNowText>Now</StyledNowText>*/}
//             <StyledBoxText>
//               <StyledTime>{item.time}</StyledTime>
//               <StyledTemperature>{item.temperature}</StyledTemperature>
//               <StyledIconСloudСomputing>
//                 <IconСloudСomputing />
//               </StyledIconСloudСomputing>
//             </StyledBoxText>
//             {/*<StyledTemperature>{item.temperature} C</StyledTemperature>*/}
//             {/*<StyledNowFon />*/}
//             <StyledBoxFon />
//           </div>
//         ))}
//       </WeatherCard>
//     </Container>
//   );
// };

// export default HourlyWeatherForecast;

//22221

// import React, { useState, useEffect } from 'react';

// import styled from 'styled-components';
// import axios from 'axios';
// import IconСloudСomputing from '../../../public/assets/images/IconСloudСomputing.svg';

// const BoxStyled = styled.div`
//   position: fixed;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   gap: 24px;
//   top: 213px;
//   left: 591px;
// `;

// const StyledBoxText = styled.div`
//   width: 80px;
//   height: 20px;
//   font-size: 22px;
//   color: #ffffff;
// `;

// const StyledTime = styled.div`
//   width: 63px;
//   height: 26px;
//   left: 600px;
//   font-size: 20px;
//   color: #fdfdfd;
// `;

// const StyledTemperature = styled.div`
//   position: relative;
//   width: 34px;
//   height: 31px;
//   top: 90px;
//   left: 30px;
//   font-size: 26px;
//   color: #fdfdfd;
// `;

// const StyledBoxFon = styled.div`
//   width: 80px;
//   height: 120px;
//   top: 255px;
//   left: 591px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   gap: 24px;

//   &:first-child {
//     margin-left: 71px;
//   }

//   &:nth-child(1) {
//     margin-top: 17px;
//   }

//   &:nth-child(2) {
//     margin-top: 17px;
//   }

//   &:nth-child(3) {
//     margin-top: 17px;
//   }

//   &:nth-child(4) {
//     margin-top: 17px;
//   }

//   &:nth-child(5) {
//     margin-top: 17px;
//   }

//   &:nth-child(6) {
//     margin-top: 17px;
//   }
// `;

// const StyledIconСloudСomputing = styled.div`
//   width: 59px;
//   height: 42px;
//   margin-left: 10px;
//   top: 271px;
// `;

// const HourlyWeatherForecast = () => {
//   const [forecastData, setForecastData] = useState([
//     { time: '12 pm', temperature: 20 },
//     { time: '1 pm', temperature: 20 },
//     { time: '2 pm', temperature: 20 },
//     { time: '3 pm', temperature: 20 },
//     { time: '4 pm', temperature: 20 },
//     { time: '5 pm', temperature: 20 },
//     { time: '6 pm', temperature: 20 },
//   ]);

//   useEffect(() => {
//     // const fetchWeatherData = async () => {
//     //   try {
//     //     const apiKey = 'f6ff5e7dcd656163a217302f41dc2916'; // Замените на ваш API ключ
//     //     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}`; // Замените на ваш URL API
//     //     const response = await axios.get(apiUrl);
//     //     const updatedForecastData = forecastData.map((item) => {
//     //       const forecastItem = response.data.forecast.find(
//     //         (forecast) => forecast.time === item.time,
//     //       );
//     //       return {
//     //         ...item,
//     //         temperature: forecastItem ? forecastItem.temperature : null,
//     //       };
//     //     });
//     //     setForecastData(updatedForecastData);
//     //   } catch (error) {
//     //     console.error('Ошибка при получении данных о погоде:', error);
//     //   }
//     // };
//     // fetchWeatherData();
//   }, []);

//   return (
//     <BoxStyled>
//       {forecastData.map((item, index) => (
//         <div key={index}>
//           {/*<StyledNowText>Now</StyledNowText>*/}
//           <StyledBoxText>
//             <StyledTime>{item.time}</StyledTime>
//             <StyledTemperature>{item.temperature}</StyledTemperature>
//             <StyledIconСloudСomputing>
//               <IconСloudСomputing />
//             </StyledIconСloudСomputing>
//           </StyledBoxText>
//           {/*<StyledTemperature>{item.temperature} C</StyledTemperature>*/}
//           {/*<StyledNowFon />*/}
//           <StyledBoxFon />
//         </div>
//       ))}
//     </BoxStyled>
//   );
// };

// export default HourlyWeatherForecast;
