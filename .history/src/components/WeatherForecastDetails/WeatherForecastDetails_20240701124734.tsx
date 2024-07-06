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

import FeatherSunrise from '../../../public/assets/images/FeatherSunrise';
import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
import Exclusion from '../../../public/assets/images/IconExclusion.svg';
import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';
import { TemperatureScaleToggle } from '../../../src/components/ToggleTemperatureScale/ToggleTemperatureScale';

const Container = styled.div`
  // position: fixed;
  display: flex;
  flex-wrap: wrap;
  top: 613px;
  left: 71px;
  max-width: 1280px;
  gap: 24px;
  // overflow-y: auto;
  @media (max-width: 375px) {
    width: 280px;
    left: 10px;
    // top: 1200px;
    margin-top: 100px;
  }

  @media (max-width: 1024px) {
    width: 660px;
    left: 71px;
    // top: 1200px;
    margin-top: 100px;
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

const StyledText = styled.div`
  position: fixed;
  font-size: 24px;
  color: var(--weatherCardline);
  top: 542px;
  left: 71px;
  width: 190px;
  height: 31px;

  @media (max-width: 375px) {
    top: 650px;
  }

  @media (max-width: 1024px) {
    top: 850px;
  }
`;
const StyledLine = styled.div`
  // position: fixed;
  top: 510px;
  left: 0;
  width: 1366px;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);
  margin-top: 20px;

  @media (max-width: 375px) {
    top: 650px;
  }

  @media (max-width: 735px) {
    top: 750px;
  }

  @media (max-width: 1024px) {
    top: 820px;
  }
`;

//РфБОТАЕТ
// const Container = styled.div`
//   position: fixed;
//   display: flex;
//   flex-wrap: wrap;
//   top: 613px;
//   left: 71px;
//   max-width: 1280px;
//   gap: 24px;
//   overflow-y: auto;
//   @media (max-width: 375px) {
//     width: 280px;
//     left: 10px;
//     top: 1000px;
//   }

//   @media (max-width: 1024px) {
//     width: 660px;
//     left: 71px;
//     top: 900px;
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

// const StyledText = styled.div`
//   position: fixed;
//   font-size: 24px;
//   color: var(--weatherCardline);
//   top: 542px;
//   left: 71px;
//   width: 190px;
//   height: 31px;

//   @media (max-width: 375px) {
//     top: 650px;
//   }

//   @media (max-width: 1024px) {
//     top: 850px;
//   }
// `;

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
    return <div>Loading...</div>;
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
      <StyledLine />
      <TemperatureScaleToggle
        onScaleChange={(scale) =>
          dispatch({ type: 'CHANGE_TEMPERATURE_SCALE', payload: scale })
        }
      />
      <StyledText>Weather Details</StyledText>
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
