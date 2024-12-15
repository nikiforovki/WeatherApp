import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import IconMaterialLocation from '../../../public/assets/images/IconMaterialLocation.svg';
import { RootState } from '../../Redux/store/store';
import { selectDescriptionIcon } from '../../Redux/slice/currentweatherSlice';
import { selectTemperature } from '../../Redux/slice/currentweatherSlice';
import { selectCity } from '../../Redux/slice/currentweatherSlice';
import IconError from '../../../public/assets/images/IconError';
import { selectFirstCityCountryName } from '../../Redux/slice/currentweatherSlice';

const Container = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 103px;

  @media (min-width: 320px) and (max-width: 374px) {
    margin-left: 120px;
  }

  @media (min-width: 375px) and (max-width: 768px) {
    margin-left: 150px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    margin-left: 350px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    margin-left: 148px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    margin-left: 148px;
  }
  @media (min-width: 1295px) and (max-width: 1365px) {
    margin-left: 148px;
  }

  @media (min-width: 1366px) {
    margin-left: 148px;
  }
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
  @media (min-width: 320px) and (max-width: 374px) {
    width: 100px;
    height: 31px;
  }
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

  @media (min-width: 375px) and (max-width: 768px) {
    width: 500px;
    height: 500px;
    left: 20px;
    top: 150px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 500px;
    height: 500px;
    left: 61px;
    top: 150px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    width: 500px;
    height: 500px;
    left: 300px;
    top: 150px;
  }

  @media (min-width: 1367px) {
    width: 500px;
    height: 500px;
    left: 400px;
    top: 150px;
  }
`;

const StyledCenteredIconError = styled(IconError)`
  top: 150px;
  width: 400px;
  height: 400px;
  left: 500px;
  transform: translate(-50%, -50%);
`;

const StyledButton = styled.button`
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
const Skeleton = styled.div`
  background-color: #ddd;
  border-radius: 10px;
  height: 20px;
  width: 50%;
  animation: pulse 1s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #eee;
    }
    100% {
      background-color: #ddd;
    }

    @media (min-width: 320px) and (max-width: 374px) {
      left: 20px;
      // margin-left: 60px;
    }

    @media (min-width: 375px) and (max-width: 768px) {
      left: 150px;
    }

    @media (min-width: 769px) and (max-width: 879px) {
      left: 350px;
    }
    @media (min-width: 880px) and (max-width: 1024px) {
      left: 148px;
    }

    @media (min-width: 1025px) and (max-width: 1294px) {
      left: 148px;
    }
    @media (min-width: 1295px) and (max-width: 1365px) {
      left: 148px;
    }

    @media (min-width: 1366px) {
      left: 148px;
    }
  }
`;

const TodayWeatherContainer: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weatherData);
  const error = useSelector((state: RootState) => state.error);
  const [temperatureScale, setTemperatureScale] = useState<'C' | 'F'>('C');
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

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const displayTemperature = () => {
    if (temperatureScale === 'C') {
      return Math.round(TemperatureToday);
    } else if (temperatureScale === 'F') {
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
        <StyledCenteredIconError />
        <div>Город не найден</div>
        <StyledButton onClick={refreshPage}>Перезагрузить</StyledButton>
      </StyledFullPageContainer>
    );
  }

  if (!weatherData && !showError) {
    return (
      <Container>
        <Skeleton style={{ height: '200px', width: '200px' }} />{' '}
      </Container>
    );
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
        {city}, {contyryName}
      </StyledCyti>
      <StyledMaterialLocation>
        <IconMaterialLocation />
      </StyledMaterialLocation>
    </Container>
  );
};

export default TodayWeatherContainer;
