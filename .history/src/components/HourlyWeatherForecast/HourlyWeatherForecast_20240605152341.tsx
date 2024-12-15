import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../Redux/store/store';
import { selectDescriptionIconHurly } from '../../Redux/slice/currentweatherSlice';
import { selectHourlyData } from '../../Redux/slice/currentweatherSlice';
import { selectHourlyTemp } from '../../Redux/slice/currentweatherSlice';
import { TemperatureScaleToggle } from '../../components/ToggleTemperatureScale/ToggleTemperatureScale';

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
  position: relative;
  top: 20px;
  left: 10px;
  width: 59px;
  height: 42px;
  top: -2px;
`;

const HourlyWeatherForecast = () => {
  const dispatch = useDispatch();

  const hourlyTemp = useSelector(selectHourlyTemp);

  const temperatureScale = useSelector((state) => state.temperatureScale);
  const [forecastData, setForecastData] = useState([]);
  const descriptionIconsHuorly = useSelector(selectDescriptionIconHurly);
  const [showError, setShowError] = useState(false);
  const error = useSelector((state: RootState) => state.error);
  console.log('Ошибка на город:', error);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (hourlyTemp && hourlyTemp.length >= 7) {
      const temps =
        temperatureScale === 'C'
          ? hourlyTemp.slice(0, 7)
          : hourlyTemp
              .slice(0, 7)
              .map((temp) => Math.floor((temp * 9) / 5 + 32));
      const icons = descriptionIconsHuorly.slice(0, 7);
      setForecastData(
        temps.map((temp, index) => ({
          time: ` ${index + 1}`,
          temperature: Math.round(temp),
          iconCode: icons[index],
        })),
      );
    }
  }, [hourlyTemp, temperatureScale, descriptionIconsHuorly]);

  const getWeatherIconUrl = (iconCode) => {
    const formattedCode = `${iconCode.slice(0, 2)}d`;
    return `https://openweathermap.org/img/w/${formattedCode}.png`;
  };

  function unixTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);

    const options = { hour: 'numeric', hour12: true };
    return `${date.toLocaleTimeString(undefined, options)}.`;
  }

  const hourlyData = useSelector(selectHourlyData);

  const formattedTimes = hourlyData.map(unixTimestampToTime);
  console.log(formattedTimes);

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
          <StyledBoxText>
            <StyledTime>{formattedTimes[index]}</StyledTime>
            <StyledTemperature>{`${item.temperature}${temperatureScale === 'C' ? '°' : '°'}`}</StyledTemperature>
            <StyledIconСloudСomputing>
              {item.iconCode && (
                <img
                  src={getWeatherIconUrl(item.iconCode)}
                  alt='weather icon'
                  style={{ width: '70px', height: '70px' }}
                />
              )}
            </StyledIconСloudСomputing>
          </StyledBoxText>
        </WeatherCard>
      ))}
    </Container>
  );
};

export default HourlyWeatherForecast;
