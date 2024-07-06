import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { RootState } from '../../Redux/store/store';
import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
import {
  selectTemperature,
  selectTemperatureScale,
} from '../../Redux/slice/currentweatherSlice';
import { selectCity } from '../../Redux/slice/currentweatherSlice';
import IconError from '../../../public/assets/images/IconError';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
import { selectFirstCityCountryName } from '../../Redux/slice/currentweatherSlice';

const Container = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 103px;
  margin-left: 150px;
`;
const StyledToday = styled.div`
  top: 100px;
  left: 148px;
  font-size: 29px;
  color: var(--today-text-color, #ffffff);
`;

const IconTodayStyled = styled.div`
  margin-top: -50px;
  margin-left: 100px;
`;

const StyledDateDisplay = styled.div`
  height: 18px;
  padding-top: 7px;
  margin-left: 0px;
  font-size: 15px;
  color: var(--dataToday-text-color, #ffffff);
  white-space: nowrap;
`;

const StyledTemperature = styled.div`
  height: 108px;
  top: 240px;
  left: 178px;
  font-size: 90px;
  color: var(--temperature-text-color, #ffffff);
  white-space: nowrap;
`;

const StyledMaterialLocation = styled.div`
  width: 16px;
  height: 23px;
  margin-top: -30px;
  margin-left: -30px;
`;

const StyledCyti = styled.div`
  width: 190px;
  height: 31px;
  top: 35px;
  left: 40px;
  font-size: 24px;
  color: var(--text-color-city);
`;

const StyledFullPageContainer = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  left: 561px;
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCenteredIconError = styled(IconError)`
  top: 150px;
  width: 400px;
  height: 400px;
  left: 500px;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled.button`
  // position: fixed;
  width: 120px;
  height: 40px;
  left: 900px;
  top: 450px;
  color: #6c63ff;
  background-color: #ffffff;
  border-color: black;
  border-radius: 5px;
  cursor: pointer;
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const error = useSelector((state: RootState) => state.error);
  // const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C');
  const descriptionIcon = useSelector(selectDescriptionIcon);
  const TemperatureToday = useSelector(selectTemperature);
  const city = useSelector(selectCity);
  const contyryName = useSelector(selectFirstCityCountryName);
  const [showError, setShowError] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const temperature = useSelector(selectTemperature);
  const temperatureScale = useSelector(selectTemperatureScale);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const convertCelsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  const displayTemperature = () => {
    if (temperatureScale === 'C') {
      return Math.round(TemperatureToday);
    } else if (temperatureScale === 'F') {
      return convertCelsiusToFahrenheit(TemperatureToday);
    } else {
      return Math.round(TemperatureToday);
    }
  };

  const getWeatherIconUrl = (iconCode) => {
    const formattedCode = `${iconCode.slice(0, 2)}d`;
    return `https://openweathermap.org/img/w/${formattedCode}.png`;
  };

  const refreshPage = () => {
    window.location.reload(true);
  };

  if (showError) {
    return (
      <StyledFullPageContainer>
        <TemperatureScaleToggle />
        <StyledCenteredIconError />
        <div>Город не найден</div>
        <StyledButton onClick={refreshPage}>Перезагрузить</StyledButton>
      </StyledFullPageContainer>
    );
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <StyledToday>Today</StyledToday>
      <StyledDateDisplay>{currentDate}</StyledDateDisplay>
      <IconTodayStyled>
        {descriptionIcon && (
          <img
            src={getWeatherIconUrl(descriptionIcon)}
            alt='weather icon'
            style={{ width: '52px', height: '59px' }}
          />
        )}
      </IconTodayStyled>
      {/* <StyledTemperature>{displayTemperature()}°</StyledTemperature> */}
      <StyledTemperature>
        {temperature}°<p>Система измерения: {temperatureScale}</p>
      </StyledTemperature>

      <StyledCyti>
        {city}, {contyryName}
      </StyledCyti>
      <StyledMaterialLocation>
        <IconMaterialLocation />
      </StyledMaterialLocation>
    </Container>
  );
};

export default TodayWeatherContainer;
