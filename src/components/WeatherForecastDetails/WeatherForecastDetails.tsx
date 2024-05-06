import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeatherRequest } from '../../Redux/actions/actions';
import { RootState } from '../../Redux/store/store';
import styled from 'styled-components';
import FeatherSunrise from '../../../public/assets/images/IconFeatherSunrise.svg';
import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
import Exclusion from '../../../public/assets/images/IconExclusion.svg';
import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';
import IconError from '../../../public/assets/images/IconError';
import { InputSearch } from '../InputSearch/InputSearch';
import { TemperatureScaleToggle } from '../ToggleTemperatureScale/ToggleTemperatureScale';
// import { handleCityChange } from '../';

const StyledFeatherSunrise = styled(FeatherSunrise)`
  position: fixed;
  width: 46px;
  height: 41px;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 650px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 300px;
    top: 700px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 282px;
    top: 780px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 674px;
    left: 282px;
  }
`;

const StyledFeatherSunset = styled(FeatherSunset)`
  position: fixed;
  width: 46px;
  height: 41px;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 820px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 600px;
    top: 700px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 591px;
    top: 780px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 591px;
    top: 674px;
  }
`;

const StyledExclusion = styled(Exclusion)`
  position: fixed;
  width: 32px;
  height: 41px;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 980px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 600px;
    top: 900px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 282px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 1222px;
    top: 676px;
  }
`;

const StyledWeatherRaindrop = styled(WeatherRaindrop)`
  position: fixed;
  width: 32px;
  height: 41px;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 1150px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 300px;
    top: 900px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 914px;
    top: 780px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 914px;
    top: 676px;
  }
`;

const StyledAwesomeWind = styled(AwesomeWind)`
  position: fixed;
  width: 47px;
  height: 41px;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 1320px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 290px;
    top: 1080px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 600px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 282px;
    top: 842px;
  }
`;

const StyledGroupArrow = styled(GroupArrow)`
  position: fixed;
  width: 51px;
  height: 44px;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 1490px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 580px;
    top: 1080px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 900px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 589px;
    top: 840px;
  }
`;

const StyledAwesomeTemperatureHigh = styled(AwesomeTemperatureHigh)`
  position: fixed;
  width: 41px;
  height: 41px;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 260px;
    top: 1650px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 290px;
    top: 1260px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 282px;
    top: 1160px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 908px;
    top: 840px;
  }
`;

const StyledMaterialVisibility = styled(MaterialVisibility)`
  position: fixed;
  width: 47px;
  height: 32px;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 250px;
    top: 1820px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 580px;
    top: 1280px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 589px;
    top: 1160px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 1215px;
    top: 858px;
  }
`;

const StyledWeatherForecastDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  left: 71px;
  margin: 0;
  overflow-y: auto;

  @media (min-width: 375px) and (max-width: 760px) {
    padding-top: 550px;
    flex-direction: column;
    left: 50px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    padding-top: 600px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    padding-top: 613px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 613px;
    margin-bottom: 15px;
  }
`;

const StyledLine = styled.div`
  position: fixed;
  top: 510px;
  width: 1366px;
  height: 0.5px;
  background-color: #ffffff;
  @media (min-width: 375px) and (max-width: 760px) {
    position: absolute;
    top: 510px;
    overflow-y: auto;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    top: 510px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 510px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 510px;
  }
`;

const StyledText = styled.div`
  position: fixed;
  width: 190px;
  height: 31px;
  left: 71px;
  font-size: 26px;
  color: #ffffff;
  @media (min-width: 375px) and (max-width: 760px) {
    position: absolute;
    top: 542px;
    overflow-y: auto;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    top: 510px;
    overflow-y: auto;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 600px;
    overflow-y: auto;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 542px;
    overflow-y: auto;
  }
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  margin-right: 24px;
  margin-bottom: 20px;
  color: #101010;
  background-color: rgb(255, 255, 255);
  overflow-y: auto;

  &:first-child,
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6),
  &:nth-child(7),
  &:nth-child(8) {
  }

  @media (min-width: 375px) and (max-width: 760px) {
    padding-top: 20px;
    &:first-child,
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
    }
  }
  @media (min-width: 760px) and (max-width: 1024px),
    @media (min-width: 1024px) and (max-width: 1366px),
    @media (min-width: 1365px) and (max-width: 1920px) {
    width: 288px;
    height: 148px;
    &:first-child,
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
    }
  }
`;

const getPositionStyles = (index) => {
  switch (index) {
    case 0:
      return `
        top: 650px;
        left: 80px;
      `;
    case 1:
      return `
        top: 650px;
        left: 50px;
      `;
    case 2:
      return `
        top: 650px;
        left: 50px;
      `;
    case 3:
      return `
        top: 1550px;
        left: 50px;
      `;
    case 4:
      return `
        top: 816px;
        left: 50px;
      `;
    case 5:
      return `
        top: 816px;
        left: 50px;
      `;
    case 6:
      return `
        top: 816px;
        left: 50px;
      `;
    case 7:
      return `
        top: 816px;
        left: 50px;
      `;
    default:
      return `
        top: 816px;
        left: 50px;
      `;
  }
};

const StyledTitle = styled.div<StyledTitleProps>`
  position: fixed;
  font-size: 19px;
  color: #072a41;
  ${(props) => getPositionStyles(props.index)}

  @media (min-width: 375px) and (max-width: 768px) {
    ${(props) =>
      props.index === 0 &&
      `
      top: 600px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 1 &&
      `
      top: 750px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 2 &&
      `
      top: 920px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 3 &&
      `
      top: 1080px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 4 &&
      `
      top: 1250px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 5 &&
      `
      top: 1430px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 6 &&
      `
      top: 1580px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 7 &&
      `
      top: 1760px;
      left: 102px;
    `}
  }

  @media (min-width: 760px) and (max-width: 1024px) {
    ${(props) =>
      props.index === 0 &&
      `
      top: 620px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 1 &&
      `
      top: 620px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 2 &&
      `
      top: 820px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 3 &&
      `
      top: 820px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 4 &&
      `
      top: 1020px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 5 &&
      `
      top: 1020px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 6 &&
      `
      top: 1220px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 7 &&
      `
      top: 1220px;
      left: 407px;
    `}
  }

  @media (min-width: 1024px) and (max-width: 1366px) {
    ${(props) =>
      props.index === 0 &&
      `
      top: 720px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 1 &&
      `
      top: 720px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 2 &&
      `
        top: 720px;
      left: 726px;
    `}
    ${(props) =>
      props.index === 3 &&
      `
      top: 920px;
      left: 80px;
    `}
    ${(props) =>
      props.index === 4 &&
      `
      top: 920px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 5 &&
      `
      top: 920px;
      left: 726px;
    `}
    ${(props) =>
      props.index === 6 &&
      `
      top: 1100px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 7 &&
      `
      top: 1100px;
      left: 407px;
    `}
  }

  @media (min-width: 1366px) and (max-width: 1920px) {
    ${(props) =>
      props.index === 0 &&
      `
      top: 650px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 1 &&
      `
      top: 650px;
      left: 407px;
    `}
    ${(props) =>
      props.index === 2 &&
      `
      top: 650px;
      left: 726px;
    `}
    ${(props) =>
      props.index === 3 &&
      `
      top: 650px;
      left: 1030px;
    `}
    ${(props) =>
      props.index === 4 &&
      `
      top: 816px;
      left: 102px;
    `}
    ${(props) =>
      props.index === 5 &&
      `
      top: 816px;
      left: 406px;
    `}
    ${(props) =>
      props.index === 6 &&
      `
      top: 816px;
      left: 726px;
    `}
    ${(props) =>
      props.index === 7 &&
      `
      top: 816px;
      left: 1030px;
    `}
  }
`;
const StyledTime = styled.time<StyledTimeProps>`
  font-size: 34px;

  ${(props) =>
    props.index === 0 &&
    `
    position: fixed;
    top: 710px;
    color: black;
 `}
  ${(props) =>
    props.index === 1 &&
    `
    position: fixed;
    top: 710px;
    color: black;
 `}
  ${(props) =>
    props.index === 2 &&
    `
    position: fixed;
    top: 710px;
    color: black;
 `}
  ${(props) =>
    props.index === 3 &&
    `
    position: fixed;
    top: 710px;
    color: black;
 `}
  ${(props) =>
    props.index === 4 &&
    `
    position: fixed;
    top: 847px;
    color: black;
 `}
  ${(props) =>
    props.index === 5 &&
    `
    position: fixed;
    top: 847px;
    color: black;
 `}
  ${(props) =>
    props.index === 6 &&
    `
    position: fixed;
    top: 847px;
    color: black;
 `}
  ${(props) =>
    props.index === 7 &&
    `
    position: fixed;
    top: 847px;
    color: black;
 `}
`;

const StyledSunrise = styled.div`
  position: fixed;
  width: 134px;
  height: 40px;
  left: 102px;
  top: 681px;
  font-size: 34px;
  color: black;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 80px;
    top: 650px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 80px;
    top: 700px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 102px;
    top: 780px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 102px;
    top: 681px;
  }
`;

const StyledSunset = styled.div`
  position: fixed;
  width: 116px;
  height: 40px;
  top: 681px;
  left: 407px;
  font-size: 34px;
  color: black;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 80px;
    top: 820px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 400px;
    top: 700px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 407px;
    top: 780px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 407px;
    top: 681px;
  }
`;

const StyledPrecipitation = styled.div`
  position: fixed;
  width: 72px;
  height: 40px;
  font-size: 34px;
  color: black;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 100px;
    top: 950px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 100px;
    top: 850px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 720px;
    top: 750px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 726px;
    top: 650px;
  }
`;

const StyledHumidity = styled.div`
  position: fixed;
  width: 100px;
  height: 42px;
  top: 681px;
  left: 1040px;
  font-size: 34px;
  color: #101010;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 100px;
    top: 1150px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 450px;
    top: 900px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 102px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 1030px;
    top: 681px;
  }
`;

const StyledWind = styled.div`
  position: fixed;
  width: 130px;
  height: 42px;
  left: 102px;
  top: 847px;
  font-size: 35px;
  color: black;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 100px;
    top: 1320px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 100px;
    top: 1080px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 407px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 102px;
    top: 847px;
  }
`;

const StyledPressure = styled.div`
  position: fixed;
  width: 150px;
  height: 42px;
  left: 406px;
  top: 847px;
  font-size: 35px;
  color: black;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 80px;
    top: 1490px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 400px;
    top: 1080px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 726px;
    top: 960px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 406px;
    top: 847px;
  }
`;

const StyledFeelsLike = styled.div`
  position: fixed;
  width: 80px;
  height: 40px;
  left: 726px;
  top: 847px;
  font-size: 34px;
  color: black;
  @media (min-width: 375px) and (max-width: 760px) {
    left: 100px;
    top: 1650px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 100px;
    top: 1260px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 102px;
    top: 1160px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 726px;
    top: 847px;
  }
`;

const StyledVisibility = styled.div`
  position: fixed;
  width: 96px;
  height: 40px;
  top: 847px;
  left: 1040px;
  font-size: 34px;
  color: #101010;

  @media (min-width: 375px) and (max-width: 760px) {
    left: 100px;
    top: 1820px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    left: 450px;
    top: 1280px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    left: 407px;
    top: 1160px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    left: 1030px;
    top: 847px;
  }
`;

const StyledFullPageContainer = styled.div`
  position: fixed;
  width: 500px;
  height: 500px;
  left: 260px;
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
  //z-index: 100;
`;

const StyledButton = styled.button`
  position: fixed;
  width: 120px;
  height: 40px;
  left: 600px;
  top: 500px;
  color: #6c63ff;
  background-color: #ffffff;
  border-color: black;
  border-radius: 5px;
  cursor: pointer;
`;

export const WeatherForecastDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData,
  );
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrentWeatherRequest({ city: 'Berlin' }));
  }, [dispatch]);

  useEffect(() => {
    if (weatherData) {
      setIsLoading(true);
    }
  }, [weatherData]);

  const convertTimestampToHoursAndMinutes = (unixTimestamp: number) => {
    const dateObj = new Date(unixTimestamp * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const formattedTime =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0');
    return formattedTime;
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  if (error) {
    return (
      <StyledFullPageContainer>
        <InputSearch />
        <TemperatureScaleToggle />
        <StyledCenteredIconError />
        <div>Что то пошло не так </div>
        <StyledButton onClick={refreshPage}>Перезагрузить</StyledButton>
      </StyledFullPageContainer>
    );
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const sunriseTime =
    convertTimestampToHoursAndMinutes(weatherData.sys.sunrise) + 'am';
  const sunsetTime =
    convertTimestampToHoursAndMinutes(weatherData.sys.sunset) + 'pm';
  const precipitation = 'Нет данных';
  const humidity = `${weatherData.main.humidity} %`;
  const wind = `${Math.round(weatherData.wind.speed)} km/h`;
  const pressure = `${weatherData.main.pressure} hPa`;
  const feelsLike = `${Math.round(weatherData.main.feels_like)} °`;
  const visibility = `${weatherData.visibility / 1000} km`;

  if (weatherData) {
    const sunriseTime =
      convertTimestampToHoursAndMinutes(weatherData.sys.sunrise) + 'am';
    const sunsetTime =
      convertTimestampToHoursAndMinutes(weatherData.sys.sunset) + 'pm';

    const forecastData = [
      {
        id: 1,
        title: 'SUNRISE',
        image: <StyledFeatherSunrise />,
        sunriseTime,
      },
      {
        id: 2,
        title: 'SUNSET',
        image: <StyledFeatherSunset />,
        sunsetTime,
      },
      {
        id: 3,
        title: 'PRECIPITATION',
        image: <StyledWeatherRaindrop />,
        precipitation,
      },
      {
        id: 4,
        title: 'HUMIDITY',
        image: <StyledExclusion />,
        humidity,
      },
      {
        id: 5,
        title: 'WIND',
        time: '16 pm',
        image: <StyledAwesomeWind />,
        wind,
      },
      {
        id: 6,
        title: 'PRESSURE',
        time: '16 pm',
        image: <StyledGroupArrow />,
        pressure,
      },
      {
        id: 7,
        title: 'FEELS LIKE',
        time: '16 pm',
        image: <StyledAwesomeTemperatureHigh />,
        feelsLike,
      },
      {
        id: 8,
        title: 'VISIBILITY',
        time: '16 pm',
        image: <StyledMaterialVisibility />,
        visibility,
      },
    ];

    return (
      <div>
        <StyledLine />
        <StyledText>Weather Details</StyledText>
        <StyledWeatherForecastDetails>
          {forecastData.map((item, index) => (
            <WeatherCard
              key={item.id}
              className={index === forecastData.length - 1 ? 'last-card' : ''}
            >
              <>
                {item.image}
                <StyledTitle index={index}>{item.title}</StyledTitle>
                <StyledSunrise>{item.sunsetTime}</StyledSunrise>
                <StyledSunset>{item.sunsetTime}</StyledSunset>
                <StyledPrecipitation>{item.precipitation}</StyledPrecipitation>
                <StyledHumidity>{item.humidity}</StyledHumidity>
                <StyledWind>{item.wind}</StyledWind>
                <StyledPressure>{item.pressure}</StyledPressure>
                <StyledFeelsLike>{item.feelsLike}</StyledFeelsLike>
                <StyledVisibility>{item.visibility}</StyledVisibility>
              </>
            </WeatherCard>
          ))}
        </StyledWeatherForecastDetails>
      </div>
    );
  }
};
