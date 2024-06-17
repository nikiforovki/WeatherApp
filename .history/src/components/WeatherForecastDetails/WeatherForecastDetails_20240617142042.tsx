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
import { TemperatureScaleToggle } from '../../../src/components/ToggleTemperatureScale/ToggleTemperatureScale';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  top: 613px;
  left: 71px;
  max-width: 1280px;

  @media (max-width: 375px) {
    width: 200px;
    left: 10px;
    top: 800px;
  }
  @media (max-width: 735px) {
    width: 200px;
    left: 10px;
    top: 800px;
  }
  @media (max-width: 1024px) {
    width: 200px;
    left: 70px;
    top: 850px;
  }
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
  padding: 0;
`;

const StyledValue = styled.div`
  position: relative;
  font-size: 35px;
  color: var(--value-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: 10px;
  opacity: 0.85;
`;

const StyledLine = styled.div`
  position: fixed;
  top: 510px;
  left: 0;
  width: 1366px;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);

  @media (max-width: 375px) {
    top: 400px;
  }
  @media (max-width: 735px) {
    width: 200px;
    top: 600px;
  }
  @media (max-width: 1024px) {
    top: 800px;
  }
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
    top: 700px;
  }
  @media (max-width: 735px) {
    width: 200px;
    top: 750px;
  }
  @media (max-width: 1024px) {
    top: 820px;
  }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const StyledSkeleton = styled(Skeleton)`
  width: 300px;
  height: 150px;
  border-radius: 4px;
`;

export const WeatherForecastDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather?.weatherData,
  );
  const error = useSelector((state: RootState) => state.error);
  console.log('Ошибка на город:', error);

  const [showError, setShowError] = useState(false);
  const temperatureScale = useSelector((state) => state.temperatureScale);

  const currentWeatherData = useSelector(selectCurrentWeatherDetails);

  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const humidity = useSelector(selectHumidity);
  const feelsLike = useSelector(selectFeelsLike);
  console.log(feelsLike);
  const pressure = useSelector(selectPressure);
  const precipitation = useSelector(selectPrecipitation);

  const visibility = useSelector(selectVisibility);

  const windSpeed = useSelector(selectWindSpeed);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }

    setIsLoading(false);
  }, [error]);

  if (showError) {
    return <div></div>;
  }

  const windSpeedKm = Math.round(windSpeed);
  const visibilityKm = Math.round(visibility / 1000);

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
      <TemperatureScaleToggle
        onScaleChange={() => dispatch(toggleTemperatureScale())}
      />
      <StyledLine />
      <StyledText>Weather Details</StyledText>
      {!isLoading ? ( // Использование isLoading вместо loading
        cardsData.map((card, index) => (
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
              <StyledValue>{windSpeedKm} km/h</StyledValue>
            )}
            {index === precrationIndex && precipitation !== undefined && (
              <StyledValue>{precipitation} % </StyledValue>
            )}
            {index === pressureIndex && pressure !== undefined && (
              <StyledValue>{pressure} hPa</StyledValue>
            )}
            {index === feelslikeIndex && feelsLike !== undefined && (
              <StyledValue>{feelsLike}°</StyledValue>
            )}
            {index === visibilityIndex && visibility !== undefined && (
              <StyledValue>{visibilityKm} km/h</StyledValue>
            )}
          </WeatherCard>
        ))
      ) : (
        <SkeletonTheme color='#FFFFFF' highlightColor='#1AADE3'>
          <SkeletonWrapper>
            <Skeleton height={500} width={500} borderRadius={20} />
            <Skeleton height={500} width={500} borderRadius={20} />
            <Skeleton height={500} width={500} borderRadius={20} />
            <Skeleton height={500} width={500} borderRadius={20} />
            <Skeleton height={500} width={500} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
          </SkeletonWrapper>
        </SkeletonTheme>
      )}
    </Container>
  );
};
