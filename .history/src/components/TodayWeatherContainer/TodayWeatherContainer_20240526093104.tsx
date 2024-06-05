import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/fetchCurrentWeatherRequest';
import { RootState } from '../../Redux/store/store';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { selectTemperature } from '../../Redux/slice/currentweatherSlice';
import { selectTimezone } from '../../Redux/slice/currentweatherSlice';

const StyledToday = styled.div`
  position: fixed;
  top: 169px;
  left: 148px;
  width: 70px;
  height: 29px;
  font-size: 29px;
  color: #ffffff;
`;

const SnowflakeStyled = styled.div`
  position: fixed;
  width: 52px;
  height: 59px;
  top: 166px;
  left: 250px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const StyledDateDisplay = styled.div`
  position: fixed;
  width: 70px;
  height: 29px;
  top: 205px;
  left: 140px;
  font-size: 18px;
  color: #ffffff;
  white-space: nowrap;
`;

const StyledTemperature = styled.div`
  position: fixed;
  width: 86px;
  height: 108px;
  top: 240px;
  left: 140px;
  font-size: 80px;
  color: #ffffff;
  white-space: nowrap;
`;

const StyledMaterialLocation = styled.div`
  position: fixed;
  width: 16px;
  height: 23px;
  top: 387px;
  left: 110px;
`;

const StyledCyti = styled.div`
  position: fixed;
  width: 190px;
  height: 31px;
  top: 383px;
  left: 142px;
  font-size: 26px;
  color: #ffffff;
`;

const StyledNowText = styled.div`
  position: fixed;
  width: 46px;
  height: 26px;
  top: 212px;
  left: 504px;
  font-size: 22px;
  color: #ffffff;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNowFon = styled.div`
  position: fixed;
  width: 80px;
  height: 120px;
  top: 255px;
  left: 487px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 40px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNowTemperature = styled.div`
  position: fixed;
  width: 24px;
  height: 31px;
  left: 500px;
  top: 326px;
  font-size: 26px;
  color: rgba(255, 255, 255, 0.6);
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledNowIcon = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  left: 500px;
  top: 271px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledWeatherIcon = styled.div`
  position: absolute;
  width: 52px;
  height: 59px;
  top: 166px;
  left: 240px;
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const error = useSelector((state: RootState) => state.error);
  const [currentCity, setCurrentCity] = useState('Berlin');
  const [temperatureScale, setTemperatureScale] = useState<'C' | 'K'>('C');
  const descriptionIcon = useSelector(selectDescriptionIcon);
  console.log('Иконка погоды', descriptionIcon);

  const TemperatureToday = useSelector(selectTemperature);
  console.log('Температура сейчас', TemperatureToday);
  const Timezone = useSelector(selectTimezone);

  useEffect(() => {
    if (currentCity) {
      dispatch(fetchCurrentWeatherRequest(currentCity));
    }
  }, [dispatch, currentCity]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (error) {
    console.error('Ошибка:', error);
    return <div>Ошибка: {error}</div>;
  }

  const displayTemperature = () => {
    if (temperatureScale === 'C') {
      return Math.floor(TemperatureToday - 273.15);
    } else {
      return Math.floor(TemperatureToday);
    }
  };
  console.log('Температура сейчас', TemperatureToday);

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
      <StyledToday>Today</StyledToday>
      <StyledDateDisplay>{currentDate}</StyledDateDisplay>
      <SnowflakeStyled>
        {descriptionIcon && getWeatherIcon(descriptionIcon)}
      </SnowflakeStyled>
      <StyledTemperature>
        {displayTemperature()}°{temperatureScale}
      </StyledTemperature>
      <StyledMaterialLocation>
        <IconMaterialLocation />
      </StyledMaterialLocation>
      <StyledCyti>{Timezone}</StyledCyti>
      <StyledNowText>Now</StyledNowText>
      <StyledNowFon />
      <StyledNowIcon>
        {descriptionIcon && getWeatherIcon(descriptionIcon)}
      </StyledNowIcon>
      <TemperatureScaleToggle onScaleChange={setTemperatureScale} />
      <StyledNowTemperature>
        {displayTemperature()}°{temperatureScale}
      </StyledNowTemperature>
    </Container>
  );
};

export default TodayWeatherContainer;
