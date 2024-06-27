import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Redux/store/store';
import {
  selectDescriptionIconHurly,
  selectHourlyData,
  selectHourlyTemp,
} from '../../Redux/slice/currentweatherSlice';
import { TemperatureScaleToggle } from '../../components/ToggleTemperatureScale/ToggleTemperatureScale';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Container = styled.div`
  position: fixed;
  top: 255px;
  left: 591px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (max-width: 375px) {
    width: 600px;
    left: 10px;
    top: 500px;
  }

  @media (max-width: 1024px) {
    width: 600px;
    left: 70px;
    top: 500px;
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

const StyledText = styled.div`
  position: absolute;
  width: 80px;
  height: 20px;
  top: 0;
  font-size: 22px;
  color: var(--box-text-color, #ffffff);
`;

const StyledTime = styled.div`
  position: absolute;
  top: -40px;
  left: 10px;
  font-size: 22px;
  color: var(--box-text-color, #ffffff);
`;

const StyledTemperature = styled.div`
  position: relative;
  width: 34px;
  height: 31px;
  top: 71px;
  left: 25px;
  font-size: 26px;
  color: var(--temperature-text-color, #ffffff);
`;

const StyledIconСloudСomputing = styled.div`
  position: relative;
  top: -16px;
  left: 10px;
  width: 59px;
  height: 42px;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
`;

const StyledSkeleton = styled(Skeleton)`
  border-radius: 40px;
`;

const HourlyWeatherForecast = () => {
  const dispatch = useDispatch();
  const hourlyTempKelvin = useSelector(selectHourlyTemp);
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const descriptionIconsHuorly = useSelector(selectDescriptionIconHurly);
  const [showError, setShowError] = useState(false);
  const error = useSelector((state) => state.error);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (hourlyTempKelvin && hourlyTempKelvin.length >= 7) {
      const hourlyTempCelsius = hourlyTempKelvin.slice(0, 7).map((temp) => {
        console.log(`Original Kelvin value: ${temp}`); // Логирование для диагностики
        if (temp > 0) {
          // Проверка на минимальное значение
          return temp - 273.15; // Конвертация из Кельвинов в градусы Цельсия
        } else {
          console.warn('Temperature below freezing point'); // Предупреждение при некорректном значении
          return 0; // Возвращаем 0 или другое безопасное значение
        }
      });
      const temps =
        temperatureScale === 'C'
          ? hourlyTempCelsius
          : hourlyTempCelsius.map((temp) => Math.floor((temp * 9) / 5 + 32)); // Конвертация в Фаренгейты, если необходимо
      const icons = descriptionIconsHuorly.slice(0, 7);
      setForecastData(
        temps.map((temp, index) => ({
          time: ` ${index + 1}`,
          temperature: Math.round(temp),
          iconCode: icons[index],
        })),
      );
    }
  }, [hourlyTempKelvin, temperatureScale, descriptionIconsHuorly]);

  const getWeatherIconUrl = (iconCode) => {
    const formattedCode = `${iconCode.slice(0, 2)}d`;
    return `https://openweathermap.org/img/w/${formattedCode}.png`;
  };

  const unixTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { hour: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options).toLowerCase();
  };

  const hourlyData = useSelector(selectHourlyData);
  const formattedTimes = hourlyData.slice(0, 7).map(unixTimestampToTime);

  if (showError) {
    return <div></div>;
  }

  return (
    <Container>
      <TemperatureScaleToggle
        onScaleChange={() => dispatch(toggleTemperatureScale())}
      />
      {forecastData.map((item, index) => (
        <WeatherCard key={index}>
          <StyledText>
            <StyledTime>{formattedTimes[index]}</StyledTime>
            <StyledTemperature>{item.temperature}</StyledTemperature>
            <StyledIconСloudСomputing>
              {item.iconCode && (
                <img
                  src={getWeatherIconUrl(item.iconCode)}
                  alt='weather icon'
                  style={{ width: '59px', height: '42px' }}
                />
              )}
            </StyledIconСloudСomputing>
          </StyledText>
        </WeatherCard>
      ))}
    </Container>
  );
};

export default HourlyWeatherForecast;
