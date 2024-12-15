import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/actions';
import { RootState } from '../../Redux/store/store';
import styled from 'styled-components';
import {
  selectCurrentWeatherDetails,
  selectHumidity,
  selectFeelsLike,
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
import IconError from '../../../public/assets/images/IconError';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  top: 613px;
  left: 71px;
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  background-color: rgb(255, 255, 255);
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
  color: #6e6c6c;
  margin-right: auto; /* Смещение всех последующих элементов вправо */
  left: 31px;
`;

const StyledImg = styled.div`
  position: relative;
  width: 46px;
  height: 41px;
  left: 80px;
  top: 20px;
`;

const StyledValue = styled.div`
  position: relative;
  font-size: 32px;
  color: #6e6c6c;
  margin-right: auto;
  left: 31px;
`;

export const WeatherForecastDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Устанавливаем начальное состояние загрузки
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather?.weatherData,
  );
  const error = useSelector((state: RootState) => state.weather?.error);
  const currentWeatherData = useSelector(selectCurrentWeatherDetails);

  const humidity = useSelector(selectHumidity);
  const feelsLike = useSelector(selectFeelsLike);
  const pressure = useSelector((state) => state.weatherData.main.pressure);
  const visibility = useSelector((state) => state.weatherData.visibility);
  console.log('Видимость', visibility);
  const windSpeed = useSelector((state) => state.weatherData.wind.speed);

  if (currentWeatherData) {
    console.log('Селектор', currentWeatherData.humidity);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchCurrentWeatherRequest({ city: 'Berlin' }));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const humidity = currentWeatherData ? currentWeatherData.humidity : null;
  // console.log('Селектор', humidity);

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
          {index === humidityIndex && humidity !== undefined && (
            <StyledValue>{humidity}%</StyledValue>
          )}
          {index === windIndex && windSpeed !== undefined && (
            <StyledValue>{windSpeed} km/h</StyledValue>
          )}
          {index === pressureIndex && pressure !== undefined && (
            <StyledValue>{pressure} hPa</StyledValue>
          )}
          {index === feelslikeIndex && feelsLike !== undefined && (
            <StyledValue>{feelsLike}°C</StyledValue>
          )}
          {index === visibilityIndex && visibility !== undefined && (
            <StyledValue>{visibility} m</StyledValue>
          )}
        </WeatherCard>
      ))}
    </Container>
  );
};
