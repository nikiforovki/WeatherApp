import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import styled from 'styled-components';
import {
  selectCurrentWeatherDetails,
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

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  top: 613px;
  left: 71px;
  max-width: 1280px;
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  background-color: var(--weatherCardBackground, rgb(255, 255, 255));
  border-radius: 4px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledDescription = styled.div`
  position: relative;
  font-size: 19px;
  color: var(--description-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
`;

const StyledImg = styled.div`
  position: relative;
  width: 46px;
  height: 41px;
  left: 80px;
  top: 10px;
`;

const StyledValue = styled.div`
  position: relative;
  font-size: 34px;
  color: var(--value-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: -20px;
`;

const StyledLine = styled.div`
  position: fixed;
  top: 510px;
  left: 0;
  width: 1366px;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);
`;
const StyledText = styled.div`
  position: fixed;
  font-size: 26px;
  color: var(--weatherCardline);
  top: 542px;
  left: 71px;
  width: 190px;
  height: 31px;
`;

export const WeatherForecastDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather?.weatherData,
  );
  // const error = useSelector((state: RootState) => state.weather?.error);
  const error = useSelector((state: RootState) => state.error);
  console.log('Ошибка на город:', error);

  const currentWeatherData = useSelector(selectCurrentWeatherDetails);

  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const humidity = useSelector(selectHumidity);
  const feelsLike = useSelector(selectFeelsLike);
  console.log('Проверка11', feelsLike);
  const pressure = useSelector(selectPressure);
  const precipitation = useSelector(selectPrecipitation);

  const visibility = useSelector(selectVisibility);

  const windSpeed = useSelector(selectWindSpeed);

  useEffect(() => {
    if (error) {
      setShowError(true); // Обновляем состояние ошибки
    }
  }, [error]);

  // Условный рендеринг: если есть ошибка, отображаем сообщение об ошибке
  if (showError) {
    return <div></div>;
  }

  if (currentWeatherData) {
  }

  if (isLoading) {
    return <div>1Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const visibilityKm = visibility / 1000;

  const sunsetTime = sunset
    ? new Date(sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Неизвестно';

  const sunriseTime = sunrise
    ? new Date(sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
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
            <StyledValue>{windSpeed} km/h</StyledValue>
          )}
          {index === precrationIndex && precipitation !== undefined && (
            <StyledValue>{precipitation} % </StyledValue>
          )}
          {index === pressureIndex && pressure !== undefined && (
            <StyledValue>{pressure} hPa</StyledValue>
          )}
          {index === feelslikeIndex && feelsLike !== undefined && (
            <StyledValue>{feelsLike}°C</StyledValue>
          )}
          {index === visibilityIndex && visibility !== undefined && (
            <StyledValue>{visibilityKm} km/h</StyledValue>
          )}
        </WeatherCard>
      ))}
    </Container>
  );
};
