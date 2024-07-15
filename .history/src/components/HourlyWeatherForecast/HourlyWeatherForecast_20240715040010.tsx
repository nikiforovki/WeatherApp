import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Redux/store/store';
import {
  selectDescriptionIconHurly,
  selectHourlyData,
  selectHourlyTemp,
} from '../../Redux/slice/currentweatherSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { WeatherCardItem } from './types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  // margin-top: -150px;
  margin-left: 487px;

  @media (min-width: 375px) and (max-width: 480px) {
    width: 280px;
    margin-left: 100px;
    margin-top: 90px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    width: 420px;
    margin-left: 90px;
    margin-top: 100px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    width: 420px;
    margin-left: 180px;
    margin-top: 100px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    width: 420px;
    margin-left: 485px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 700px;
    margin-left: 385px;
  }

  @media (min-width: 1367px) {
    width: 850px;
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
  margin-bottom: 50px;
`;

const StyledText = styled.div`
  position: absolute;
  width: 80px;
  height: 20px;
  top: 0;
  font-size: 22px;
  color: var(--box-text-color, #ffffff);
  gap: 10px;
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
  position: absolute;
  top: 155px;
  left: 487px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  z-index: 100;
  @media (min-width: 375px) and (max-width: 480px) {
    width: 280px;
    left: 100px;
    top: 390px;
    gap: 24px;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    width: 420px;
    left: 90px;
    top: 410px;
    gap: 24px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    width: 420px;
    left: 180px;
    top: 420px;
    gap: 24px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    width: 420px;
    left: 485px;
    top: 160px;
    gap: 24px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    width: 700px;
    left: 385px;
    top: 170px;
    gap: 24px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    width: 900px;
    left: 487px;
    top: 180px;
    gap: 24px;
  }
`;

const SpecialWeatherCard = styled(WeatherCard)`
  position: relactive;
  background-color: rgba(255, 255, 255, 0.6);
`;
const StyledNowText = styled.div`
  position: absolute;
  width: 46px;
  height: 26px;
  top: -40px;
  left: 20px;
  font-size: 22px;
  color: var(--now-text-color);
`;
const StyledNowTemperature = styled.div`
  position: absolute;
  width: 24px;
  height: 31px;
  left: 25px;
  top: 70px;
  font-size: 26px;
  color: var(--temperature-now-text-color);
  bottom: 20px;
`;

const StyledNowIcon = styled.div`
  position: absolute;
  width: 37px;
  height: 42px;
  left: 10px;
  top: 15px;
  bottom: 20px;
`;

const HourlyWeatherForecast = () => {
  const dispatch = useDispatch();
  const hourlyTemp = useSelector(selectHourlyTemp);
  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [forecastData, setForecastData] = useState<WeatherCardItem[]>([]);
  const descriptionIconsHuorly = useSelector(selectDescriptionIconHurly);
  const [showError, setShowError] = useState(false);
  const error = useSelector((state: RootState) => state.error);
  console.log('1Данные', error);
  const [loading, setLoading] = useState(false);
  console.log('loading', loading);

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
          ? hourlyTemp.slice(0, 8)
          : hourlyTemp.slice(0, 8).map((temp: number) => Math.floor(temp));
      const icons = descriptionIconsHuorly.slice(0, 8);
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

  const displayTemperature = () => {
    return Math.round(hourlyTemp[0]);
  };

  if (showError) {
    return <div></div>;
  }

  return (
    <Container>
      {loading ? (
        <SkeletonTheme color='#FFFFFF' highlightColor='#1AADE3'>
          <SkeletonWrapper>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} height={180} width={80} borderRadius={20} />
            ))}
          </SkeletonWrapper>
        </SkeletonTheme>
      ) : (
        <>
          <SpecialWeatherCard>
            <StyledNowText>Now</StyledNowText>
            <StyledNowIcon>
              {descriptionIconsHuorly[0] && (
                <img
                  src={getWeatherIconUrl(descriptionIconsHuorly[0])}
                  alt='weather icon'
                  style={{ width: '59px', height: '42px' }}
                />
              )}
            </StyledNowIcon>
            <StyledNowTemperature>{displayTemperature()}°</StyledNowTemperature>
          </SpecialWeatherCard>
          {forecastData.map((item, index) => (
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
          ))}
        </>
      )}
    </Container>
  );
};
export default HourlyWeatherForecast;
