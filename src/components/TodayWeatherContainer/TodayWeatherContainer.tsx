//Рабочий код 26.04
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import IconError from '../../../public/assets/images/IconError';
import Snowflake from '../../../public/assets/images/Snowflake';
import WeatherIcon from '../../../public/assets/images/WeatherIcon';
import SunIcon from '../../../public/assets/images/SunIcon';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/fetchCurrentWeatherRequest';
import { RootState } from '../../Redux/store/store';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledContainer = styled.div`
  position: fixed;
  display: flex;
  width: 1366px;
  padding: 0 10px;

  @media (min-width: 375px) and (max-width: 768px) {
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 1024px) and (max-width: 1366px) {
  }

  @media (min-width: 1366px) and (max-width: 1920px) {
  }

  @media (min-width: 1920px) {
  }
`;

const StyledToday = styled.div`
  position: fixed;
  width: 70px;
  height: 29px;
  font-size: 29px;
  color: #ffffff;

  @media (min-width: 375px) and (max-width: 768px) {
    top: 169px;
    left: 148px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    top: 169px;
    left: 148px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 169px;
    left: 148px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 169px;
    left: 148px;
  }
  @media (min-width: 1920px) {
    top: 169px;
    left: 148px;
  }
`;

const StyledWeatherIcon = styled.div`
  position: fixed;
  width: 52px;
  height: 59px;

  @media (min-width: 375px) and (max-width: 760px) {
    margin-top: 0px;
    margin-left: 250px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    top: -166px;
    left: 250px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 166px;
    left: 250px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 166px;
    left: 250px;
  }
  @media (max-width: 1920px) {
    top: 166px;
    left: 250px;
  }
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
  @media (min-width: 375px) and (max-width: 768px) {
    top: 205px;
    left: 140px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    top: 205px;
    left: 140px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 205px;
    left: 140px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 205px;
    left: 140px;
  }
`;

const StyledTemperature = styled.div`
  position: fixed;
  width: 86px;
  height: 108px;
  font-size: 80px;
  color: #ffffff;

  @media (min-width: 375px) and (max-width: 768px) {
    top: 240px;
    left: 120px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    top: 240px;
    left: 100px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 240px;
    left: 100px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 240px;
    left: 178px;
  }
  @media (min-width: 1920px) {
    top: 240px;
    left: 178px;
  }
`;

const StyledMaterialLocation = styled.div`
  position: absolute;
  width: 16px;
  height: 23px;
  top: 387px;
  left: 110px;

  @media (min-width: 375px) and (max-width: 768px) {
    top: 387px;
    left: 110px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    top: 387px;
    left: 110px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 387px;
    left: 110px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 387px;
    left: 110px;
  }
  @media (min-width: 1920px) {
    top: 387px;
    left: 110px;
  }
`;

const StyledCyti = styled.div`
  position: absolute;
  width: 190px;
  height: 31px;
  top: 383px;
  left: 142px;
  font-size: 26px;
  color: #ffffff;
  @media (min-width: 375px) and (max-width: 760px) {
    top: 383px;
    left: 150px;
  }

  @media (min-width: 760px) and (max-width: 1024px) {
    top: 383px;
    left: 150px;
  }

  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 383px;
    left: 178px;
  }

  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 383px;
    left: 178px;
  }
`;

const StyledNowText = styled.div`
  position: fixed;
  width: 46px;
  height: 26px;
  font-size: 22px;
  color: #ffffff;

  @media (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }

  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 244px;
    left: 504px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 244px;
    left: 504px;
  }
  @media (min-width: 1920px) {
    top: 244px;
    left: 504px;
  }
`;

const StyledNowFon = styled.div`
  position: fixed;
  width: 80px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 40px;

  @media (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 287px;
    left: 487px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 287px;
    left: 490px;
  }
  @media (min-width: 1920px) {
    top: 287px;
    left: 490px;
  }
`;

const StyledNowTemperature = styled.div`
  position: fixed;
  width: 24px;
  height: 31px;
  font-size: 26px;
  color: rgba(255, 255, 255, 0.6);

  @media (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 500px;
    top: 358px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 510px;
    top: 358px;
  }
  @media (min-width: 1920px) {
    left: 510px;
    top: 358px;
  }
`;

const StyledNowIcon = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;

  @media (min-width: 375px) and (max-width: 768px) {
    display: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 303px;
    left: 500px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 500px;
    top: 303px;
  }
  @media (min-width: 1920px) {
    left: 500px;
    top: 303px;
  }
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData,
  );
  const error = useSelector((state: RootState) => state.weather.error);
  const [currentCity, setCurrentCity] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const KELVIN_TO_CELSIUS = 273.15;

  useEffect(() => {
    if (weatherData) {
      setIsLoading(false);
      console.log('Data loaded, isLoading set to false');
    }
  }, [weatherData]);

  useEffect(() => {
    if (currentCity) {
      setIsLoading(true);
      dispatch(fetchCurrentWeatherRequest(currentCity));
      console.log('Fetching data for city:', currentCity);
    }
  }, [dispatch, currentCity]);

  useEffect(() => {
    if (!isLoading) {
    }
  }, [isLoading]);

  const handleCityChange = (city: string) => {
    setCurrentCity(city);
  };

  const handleTemperatureToggle = (isCelsius: boolean) => {
    setIsCelsius(isCelsius);
  };

  const weatherDescription = weatherData?.weather[0]?.description;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!weatherData) {
    return <div>Загрузка данных о погоде...</div>;
  }

  const currentTemperature = weatherData.main.temp - KELVIN_TO_CELSIUS;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const displayTemperature = isCelsius
    ? currentTemperature.toFixed(1)
    : celsiusToFahrenheit(currentTemperature).toFixed(1);

  const getWeatherIcon = (description) => {
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
    <StyledContainer>
      <InputSearch onCityChange={handleCityChange} />
      <div>
        <StyledToday>Today</StyledToday>
        <StyledDateDisplay>{currentDate}</StyledDateDisplay>
        <StyledWeatherIcon>
          {weatherDescription && getWeatherIcon(weatherDescription)}
        </StyledWeatherIcon>
        <StyledTemperature>{displayTemperature}°</StyledTemperature>
        <StyledMaterialLocation>
          <IconMaterialLocation />
        </StyledMaterialLocation>
        <StyledCyti>
          {cityName}, {country}
        </StyledCyti>
        <StyledNowText>Now</StyledNowText>
        <StyledNowFon />
        <StyledNowIcon>
          {weatherDescription && getWeatherIcon(weatherDescription)}
        </StyledNowIcon>
        <StyledNowTemperature>{displayTemperature}°</StyledNowTemperature>
        <TemperatureScaleToggle onToggle={handleTemperatureToggle} />
        <HourlyWeatherForecast error={error} weatherData={weatherData} />
      </div>
    </StyledContainer>
  );
};

export default TodayWeatherContainer;
