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
import { WeatherCardItem } from './types';

const Container = styled.div`
  position: fixed;
  top: 255px;
  left: 591px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (max-width: 375px) {
    width: 280px;
    left: 10px;
    top: 500px;
    gap: 40px;
  }

  @media (max-width: 1024px) {
    width: 500px;
    left: 70px;
    top: 500px;
    gap: 40px;
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
  position: fixed;
  top: 255px;
  left: 591px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (max-width: 375px) {
    width: 280px;
    left: 10px;
    top: 500px;
    gap: 40px;
  }

  @media (max-width: 1024px) {
    width: 500px;
    left: 70px;
    top: 500px;
    gap: 40px;
  }
`;

const StyledLine = styled.div`
  position: fixed;
  top: 510px;
  left: 0;
  width: 1366px;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);
  @media (max-width: 375px) {
    top: 650px;
  }

  @media (max-width: 1024px) {
    top: 820px;
  }
`;

const HourlyWeatherForecast = () => {
  const dispatch = useDispatch();
  const hourlyTemp = useSelector(selectHourlyTemp);
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [forecastData, setForecastData] = useState<WeatherCardItem[]>([]);
  const descriptionIconsHuorly = useSelector(selectDescriptionIconHurly);
  const [showError, setShowError] = useState(false);
  const error = useSelector((state: RootState) => state.error);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    setLoading(true);
    if (hourlyTemp && hourlyTemp.length >= 7) {
      const temps =
        temperatureScale === 'C'
          ? hourlyTemp.slice(0, 7)
          : hourlyTemp
              .slice(0, 7)
              .map((temp: number) => Math.floor((temp * 9) / 5 + 32));
      const icons = descriptionIconsHuorly.slice(0, 7);
      setForecastData(
        temps.map((temp: number, index: number) => ({
          time: ` ${index + 1}`,
          temperature: Math.round(temp),
          iconCode: icons[index],
        })),
      );
      setLoading(false);
    }
  }, [hourlyTemp, temperatureScale, descriptionIconsHuorly]);

  const getWeatherIconUrl = (iconCode: string) => {
    const formattedCode = `${iconCode.slice(0, 2)}d`;
    return `https://openweathermap.org/img/w/${formattedCode}.png`;
  };

  function unixTimestampToTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      hour12: true,
    };
    return date.toLocaleTimeString(undefined, options).toLowerCase();
  }

  const hourlyData = useSelector(selectHourlyData);
  const formattedTimes = hourlyData.map(unixTimestampToTime);

  if (showError) {
    return <div>Error occurred</div>;
  }

  return (
    <Container>
      <TemperatureScaleToggle onScaleChange={() => dispatch()} />
      {loading ? (
        <SkeletonTheme color='#FFFFFF' highlightColor='#1AADE3'>
          {' '}
          <SkeletonWrapper>
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
            <Skeleton height={180} width={80} borderRadius={20} />
          </SkeletonWrapper>
        </SkeletonTheme>
      ) : (
        forecastData.map((item, index) => (
          <WeatherCard key={index}>
            <StyledText>
              <StyledTime>{formattedTimes[index]}</StyledTime>
              <StyledTemperature>{`${item.temperature}${temperatureScale === 'C' ? '°' : '°'}`}</StyledTemperature>
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
        ))
      )}
    </Container>
    <StyledLine />
  );
};

export default HourlyWeatherForecast;
