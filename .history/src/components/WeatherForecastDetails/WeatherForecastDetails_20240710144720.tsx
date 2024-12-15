import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import styled from 'styled-components';
import {
  selectSunrise,
  selectSunset,
  selectHumidity,
  selectFeelsLike,
  selectPrecipitation,
  selectPressure,
  selectWindSpeed,
  selectVisibility,
} from '../../Redux/slice/currentweatherSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import FeatherSunrise from '../../../public/assets/images/FeatherSunrise';
import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
import Exclusion from '../../../public/assets/images/IconExclusion.svg';
import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 71px;
  margin-top: 40px;
  max-width: 1280px;
  gap: 24px;

  @media (min-width: 375px) and (max-width: 768px) {
    margin-left: 150px;
    margin-bottom: 100px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    margin-left: 71px;
    margin-bottom: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    margin-left: 71px;
    margin-bottom: 100px;
  }

  @media (min-width: 1367px) {
    margin-left: 71px;
  }
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  background-color: var(--weatherCardBackground, rgb(255, 255, 255));
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledDescription = styled.div`
  position: relative;
  font-size: 19px;
  color: var(--description-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: 37px;
  opacity: 0.6;
`;

const StyledImg = styled.div`
  position: relative;
  width: 46px;
  height: 41px;
  left: 100px;
  top: 50px;
  pading: 0;
`;

const StyledValue = styled.div`
  position: relative;
  font-size: 35px;
  color: var(--value-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: 0px;
  opacity: 0.85;
`;

export const WeatherForecastDetails: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather?.weatherData,
  );
  const error = useSelector((state: RootState) => state.error);
  const [showError, setShowError] = useState(false);
  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const humidity = useSelector(selectHumidity);
  const feelsLike = useSelector(selectFeelsLike);
  const roundFeelsLike = Math.round(feelsLike);
  const pressure = useSelector(selectPressure);
  const precipitation = useSelector(selectPrecipitation);
  const visibility = useSelector(selectVisibility);
  const windSpeed = useSelector(selectWindSpeed);
  const roundedWindSpeed = Math.round(windSpeed);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setIsLoading(false);
    }
  }, [error]);

  if (showError) {
    return (
      <div>
        Error:{' '}
        {error ? error.message : 'Ошибка произошла, но детали не доступны'}
      </div>
    );
  }

  if (isLoading) {
    return (
      <Container>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <WeatherCard key={index}>
              <StyledDescription>
                <Skeleton width={150} height={24} />
              </StyledDescription>
              <StyledImg>
                <Skeleton width={46} height={41} />
              </StyledImg>
              <StyledValue>
                <Skeleton width={100} height={35} />
              </StyledValue>
            </WeatherCard>
          ))}
      </Container>
    );
  }

  const convertCelsiusToFahrenheit = (temp: number) => {
    return Math.round((temp * 9) / 5 + 32);
  };

  const visibilityKm = visibility / 1000;

  const sunsetTime = sunset
    ? new Date(sunset * 1000)
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase()
    : 'Неизвестно';

  const sunriseTime = sunrise
    ? new Date(sunrise * 1000)
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase()
    : 'Неизвестно';

  const cardsData = [
    { description: 'SUNRISE', img: <FeatherSunrise /> },
    { description: 'SUNSET', img: <FeatherSunset /> },
    { description: 'PRECIPITATION', img: <WeatherRaindrop /> },
    { description: 'HUMIDITY', img: <Exclusion /> },
    { description: 'WIND', img: <AwesomeWind /> },
    { description: 'PRESSURE', img: <GroupArrow /> },
    { description: 'FEELS LIKE', img: <AwesomeTemperatureHigh /> },
    { description: 'VISIBILITY', img: <MaterialVisibility /> },
  ];

  const sunriseIndex = cardsData.findIndex(
    (card) => card.description === 'SUNRISE',
  );

  const sunsetIndex = cardsData.findIndex(
    (card) => card.description === 'SUNSET',
  );

  const precrationIndex = cardsData.findIndex(
    (card) => card.description === 'PRECIPITATION',
  );

  const humidityIndex = cardsData.findIndex(
    (card) => card.description === 'HUMIDITY',
  );
  const windIndex = cardsData.findIndex((card) => card.description === 'WIND');

  const pressureIndex = cardsData.findIndex(
    (card) => card.description === 'PRESSURE',
  );

  const feelslikeIndex = cardsData.findIndex(
    (card) => card.description === 'FEELS LIKE',
  );

  const visibilityIndex = cardsData.findIndex(
    (card) => card.description === 'VISIBILITY',
  );

  return (
    <Container>
      {cardsData.map((card, index) => (
        <WeatherCard key={index}>
          <StyledDescription>{card.description}</StyledDescription>
          <StyledImg>{card.img}</StyledImg>

          {index === sunriseIndex && sunrise !== undefined && (
            <StyledValue>{sunriseTime}</StyledValue>
          )}

          {index === sunsetIndex && sunset !== undefined && (
            <StyledValue>{sunsetTime}</StyledValue>
          )}
          {index === humidityIndex && humidity !== undefined && (
            <StyledValue>{humidity}%</StyledValue>
          )}
          {index === windIndex && windSpeed !== undefined && (
            <StyledValue>{roundedWindSpeed} km/h</StyledValue>
          )}
          {index === precrationIndex && precipitation !== undefined && (
            <StyledValue>{precipitation} % </StyledValue>
          )}
          {index === pressureIndex && pressure !== undefined && (
            <StyledValue>{pressure} hPa</StyledValue>
          )}
          {index === feelslikeIndex && feelsLike !== undefined && (
            <StyledValue>{roundFeelsLike}°</StyledValue>
          )}
          {index === visibilityIndex && visibility !== undefined && (
            <StyledValue>{visibilityKm} km/h</StyledValue>
          )}
        </WeatherCard>
      ))}
    </Container>
  );
};

//Работает
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../Redux/store/store';
// import styled from 'styled-components';
// import {
//   selectSunrise,
//   selectSunset,
//   selectHumidity,
//   selectFeelsLike,
//   selectPrecipitation,
//   selectPressure,
//   selectWindSpeed,
//   selectVisibility,
// } from '../../Redux/slice/currentweatherSlice';

// import FeatherSunrise from '../../../public/assets/images/FeatherSunrise';
// import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
// import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
// import Exclusion from '../../../public/assets/images/IconExclusion.svg';
// import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
// import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
// import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
// import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin-left: 71px;
//   margin-top: 40px;
//   max-width: 1280px;
//   gap: 24px;

//   @media (min-width: 375px) and (max-width: 768px) {
//     margin-left: 150px;
//     margin-bottom: 100px;
//   }

//   @media (min-width: 769px) and (max-width: 1024px) {
//     margin-left: 71px;
//     margin-bottom: 100px;
//   }

//   @media (min-width: 1025px) and (max-width: 1366px) {
//     margin-left: 71px;
//     margin-bottom: 100px;
//   }

//   @media (min-width: 1367px) {
//     margin-left: 71px;
//   }
// `;

// const WeatherCard = styled.div`
//   width: 288px;
//   height: 146px;
//   background-color: var(--weatherCardBackground, rgb(255, 255, 255));
//   border-radius: 4px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const StyledDescription = styled.div`
//   position: relative;
//   font-size: 19px;
//   color: var(--description-text-color, #6e6c6c);
//   margin-right: auto;
//   left: 31px;
//   top: 37px;
//   opacity: 0.6;
// `;

// const StyledImg = styled.div`
//   position: relative;
//   width: 46px;
//   height: 41px;
//   left: 100px;
//   top: 50px;
//   pading: 0;
// `;

// const StyledValue = styled.div`
//   position: relative;
//   font-size: 35px;
//   color: var(--value-text-color, #6e6c6c);
//   margin-right: auto;
//   left: 31px;
//   top: 0px;
//   opacity: 0.85;
// `;

// export const WeatherForecastDetails: React.FC = () => {
//   const dispatch = useDispatch();
//   const weatherData = useSelector(
//     (state: RootState) => state.weather?.weatherData,
//   );
//   const error = useSelector((state: RootState) => state.error);
//   const [showError, setShowError] = useState(false);
//   const sunrise = useSelector(selectSunrise);
//   const sunset = useSelector(selectSunset);
//   const humidity = useSelector(selectHumidity);
//   const feelsLike = useSelector(selectFeelsLike);
//   const roundFeelsLike = Math.round(feelsLike);
//   const pressure = useSelector(selectPressure);
//   const precipitation = useSelector(selectPrecipitation);
//   const visibility = useSelector(selectVisibility);
//   const windSpeed = useSelector(selectWindSpeed);
//   const roundedWindSpeed = Math.round(windSpeed);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (error) {
//       setShowError(true);
//     } else {
//       setIsLoading(false);
//     }
//   }, [error]);

//   if (showError) {
//     return (
//       <div>
//         Error:{' '}
//         {error ? error.message : 'Ошибка произошла, но детали не доступны'}
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const convertCelsiusToFahrenheit = (temp: number) => {
//     return Math.round((temp * 9) / 5 + 32);
//   };

//   const visibilityKm = visibility / 1000;

//   const sunsetTime = sunset
//     ? new Date(sunset * 1000)
//         .toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//         })
//         .toLowerCase()
//     : 'Неизвестно';

//   const sunriseTime = sunrise
//     ? new Date(sunrise * 1000)
//         .toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//         })
//         .toLowerCase()
//     : 'Неизвестно';

//   const cardsData = [
//     { description: 'SUNRISE', img: <FeatherSunrise /> },
//     { description: 'SUNSET', img: <FeatherSunset /> },
//     { description: 'PRECIPITATION', img: <WeatherRaindrop /> },
//     { description: 'HUMIDITY', img: <Exclusion /> },
//     { description: 'WIND', img: <AwesomeWind /> },
//     { description: 'PRESSURE', img: <GroupArrow /> },
//     { description: 'FEELS LIKE', img: <AwesomeTemperatureHigh /> },
//     { description: 'VISIBILITY', img: <MaterialVisibility /> },
//   ];

//   const sunriseIndex = cardsData.findIndex(
//     (card) => card.description === 'SUNRISE',
//   );

//   const sunsetIndex = cardsData.findIndex(
//     (card) => card.description === 'SUNSET',
//   );

//   const precrationIndex = cardsData.findIndex(
//     (card) => card.description === 'PRECIPITATION',
//   );

//   const humidityIndex = cardsData.findIndex(
//     (card) => card.description === 'HUMIDITY',
//   );
//   const windIndex = cardsData.findIndex((card) => card.description === 'WIND');

//   const pressureIndex = cardsData.findIndex(
//     (card) => card.description === 'PRESSURE',
//   );

//   const feelslikeIndex = cardsData.findIndex(
//     (card) => card.description === 'FEELS LIKE',
//   );

//   const visibilityIndex = cardsData.findIndex(
//     (card) => card.description === 'VISIBILITY',
//   );

//   return (
//     <Container>
//       {cardsData.map((card, index) => (
//         <WeatherCard key={index}>
//           <StyledDescription>{card.description}</StyledDescription>
//           <StyledImg>{card.img}</StyledImg>

//           {index === sunriseIndex && sunrise !== undefined && (
//             <StyledValue>{sunriseTime}</StyledValue>
//           )}

//           {index === sunsetIndex && sunset !== undefined && (
//             <StyledValue>{sunsetTime}</StyledValue>
//           )}
//           {index === humidityIndex && humidity !== undefined && (
//             <StyledValue>{humidity}%</StyledValue>
//           )}
//           {index === windIndex && windSpeed !== undefined && (
//             <StyledValue>{roundedWindSpeed} km/h</StyledValue>
//           )}
//           {index === precrationIndex && precipitation !== undefined && (
//             <StyledValue>{precipitation} % </StyledValue>
//           )}
//           {index === pressureIndex && pressure !== undefined && (
//             <StyledValue>{pressure} hPa</StyledValue>
//           )}
//           {index === feelslikeIndex && feelsLike !== undefined && (
//             <StyledValue>{roundFeelsLike}°</StyledValue>
//           )}
//           {index === visibilityIndex && visibility !== undefined && (
//             <StyledValue>{visibilityKm} km/h</StyledValue>
//           )}
//         </WeatherCard>
//       ))}
//     </Container>
//   );
// };
