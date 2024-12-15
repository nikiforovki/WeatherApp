import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';
import { ToggleTemperatureScale } from '../ToggleTemperatureScale/ToggleTemperatureScale';

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
  color: var(--box-text-color, #ffffff);
`;

const StyledTime = styled.div`
  position: absolute;
  top: -40px;
  width: 63px;
  height: 26px;
  left: 10px;
  font-size: 22px;
  color: var(--box-text-color, #ffffff);
`;

const StyledTemperature = styled.div`
  position: absolute;
  width: 34px;
  height: 31px;
  top: 80px;
  left: 25px;
  font-size: 26px;
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
  const temperatureScale = useSelector(selectTemperatureScale);
  const [forecastData, setForecastData] = useState([]);
  const hourlyTemp = useSelector(selectHourlyTemp);

  useEffect(() => {
    if (hourlyTemp && hourlyTemp.length >= 7) {
      const firstSevenTemps = hourlyTemp.slice(0, 7);
      const firstSevenTempsInSelectedScale = firstSevenTemps.map((temp) => {
        if (temperatureScale === 'C') {
          return Math.floor(temp);
        } else {
          return Math.floor((temp * 9) / 5 + 32);
        }
      });
      setForecastData([
        { time: '12 pm', temperature: firstSevenTempsInSelectedScale[0] },
        { time: '1 pm', temperature: firstSevenTempsInSelectedScale[1] },
        { time: '2 pm', temperature: firstSevenTempsInSelectedScale[2] },
        { time: '3 pm', temperature: firstSevenTempsInSelectedScale[3] },
        { time: '4 pm', temperature: firstSevenTempsInSelectedScale[4] },
        { time: '5 pm', temperature: firstSevenTempsInSelectedScale[5] },
        { time: '6 pm', temperature: firstSevenTempsInSelectedScale[6] },
      ]);
    }
  }, [hourlyTemp, temperatureScale]);

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return <SunIcon />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <WeatherIcon />;
      case 'shower rain':
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
