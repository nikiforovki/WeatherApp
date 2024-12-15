import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store/store'; // Импортируйте ваш тип RootState
import {
  selectTemperatureScale,
  selectDescriptionIcon,
  selectCity,
  selectFirstCityCountryName,
} from '../../Redux/slice/currentweatherSlice'; // Предполагается, что у вас есть селекторы для этих данных
// import {
//   StyledFullPageContainer,
//   StyledCenteredIconError,
//   StyledButton,
//   Container,
//   StyledToday,
//   StyledDateDisplay,
//   IconTodayStyled,
//   StyledTemperature,
//   StyledCyti,
//   StyledMaterialLocation,
// } from './styles'; // Импортируйте стилизованные компоненты
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale'; // Импортируйте компонент переключателя шкалы
// import {IconError} from `../../../public/assets/images/IconError`

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

// const StyledCenteredIconError = styled(IconError)`
//   top: 150px;
//   width: 400px;
//   height: 400px;
//   left: 500px;
//   transform: translate(-50%, -50%);
// `;

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
  const temperatureScale = useSelector(selectTemperatureScale); // Используем селектор для получения текущей шкалы
  console.log('Temperature в Тудей', temperatureScale);
  const descriptionIcon = useSelector(selectDescriptionIcon);
  const TemperatureToday = useSelector(selectTemperatureScale); // Измените селектор, если он зависит от шкалы
  console.log('Temperature в Тудей2', temperatureScale);
  const city = useSelector(selectCity);
  const countryName = useSelector(selectFirstCityCountryName);
  const [showError, setShowError] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const displayTemperature = () => {
    console.log('Temperature в компаненте', displayTemperature);
    if (temperatureScale === 'metric') {
      return Math.round(TemperatureToday);
    } else if (temperatureScale === 'imperial') {
      // Здесь предполагается, что TemperatureToday уже представлена в градусах Фаренгейта
      return Math.round(TemperatureToday);
    } else {
      // Если шкала не 'metric' и не 'imperial', предположим, что она не поддерживается
      console.warn('Unsupported temperature scale:', temperatureScale);
      return 0; // Возвращаем 0 или другое значение по умолчанию
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
        {/* <StyledCenteredIconError /> */}
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
      <StyledTemperature>{displayTemperature()}°</StyledTemperature>

      <StyledCyti>
        {city}, {countryName}
      </StyledCyti>
      <StyledMaterialLocation>
        {/* <IconMaterialLocation /> */}
      </StyledMaterialLocation>
    </Container>
  );
};

export default TodayWeatherContainer;
