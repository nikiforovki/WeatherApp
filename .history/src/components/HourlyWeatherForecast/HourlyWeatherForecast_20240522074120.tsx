import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCurrentWeatherDetails } from '../../Redux/slice/currentweatherSlice'; // Предполагается, что у вас есть другой селектор для получения данных
import SunIcon from '../../../public/assets/images/SunIcon';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import Snowflake from '../../../public/assets/images/Snowflake';

interface HourlyWeather {
  dt: number;
  temp: number; // Убедитесь, что это поле существует и называется "temp"
  tempFahrenheit?: number;
  description?: string;
}

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  top: 280px;
  left: 650px;
`;

const WeatherCard = styled.div`
  width: 80px;
  height: 120px;
  background-color: rgba(26, 32, 33, 0.3);
  border-radius: 40px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTemp = styled.div`
  font-size: 20px;
  color: azure;
`;

const StyledTime = styled.div`
  font-size: 20px;
  color: azure;
`;

const HourlyWeatherForecast: React.FC = () => {
  const weatherData = useSelector(selectCurrentWeatherDetails);

  if (!weatherData || !weatherData.firstSixHours) {
    return <div>Loading...</div>;
  }
  const [forecastData, setForecastData] = useState([
    { time: '12 pm', temperature: 20 },
    { time: '1 pm', temperature: 20 },
    { time: '2 pm', temperature: 20 },
    { time: '3 pm', temperature: 20 },
    { time: '4 pm', temperature: 20 },
    { time: '5 pm', temperature: 20 },
    { time: '6 pm', temperature: 20 },
  ]);

  return (
    <Container>
      {weatherData.forecastData.map((hour: HourlyWeather, index: number) => (
        <WeatherCard key={index}>
          <StyledTemp>{hour.temp.toFixed(2)}°C</StyledTemp>
          <StyledTime>({/* Конвертация времени */})</StyledTime>
        </WeatherCard>
      ))}
    </Container>
  );
};

export default HourlyWeatherForecast;

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
//   top: 280px;
//   left: 650px;
// `;

// const WeatherCard = styled.div`
//   width: 80px;
//   height: 120px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   margin: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
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
