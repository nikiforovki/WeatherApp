import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeatherSunrise from '../../../public/assets/images/IconFeatherSunrise.svg';
import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
import Exclusion from '../../../public/assets/images/IconExclusion.svg';
import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';
import axios from 'axios';

interface StyledTimeProps {
  index: number;
}
interface StyledTitleProps {
  title: string;
  index: number;
}

const StyledFeatherSunrise = styled(FeatherSunrise)`
  position: fixed;
  width: 46px;
  height: 41px;
  left: 282px;
  top: 674px;
`;

const StyledFeatherSunset = styled(FeatherSunset)`
  position: fixed;
  width: 46px;
  height: 41px;
  left: 591px;
  top: 674px;
`;

const StyledWeatherRaindrop = styled(WeatherRaindrop)`
  position: fixed;
  width: 32px;
  height: 41px;
  left: 914px;
  top: 674px;
`;

const StyledExclusion = styled(Exclusion)`
  position: fixed;
  width: 32px;
  height: 41px;
  left: 1222px;
  top: 674px;
`;

const StyledAwesomeWind = styled(AwesomeWind)`
  width: 47px;
  height: 41px;
  position: fixed;
  left: 282px;
  top: 842px;
`;

const StyledGroupArrow = styled(GroupArrow)`
  width: 51px;
  height: 44px;
  position: fixed;
  left: 589px;
  top: 842px;
`;

const StyledAwesomeTemperatureHigh = styled(AwesomeTemperatureHigh)`
  width: 41px;
  height: 41px;
  position: fixed;
  left: 908px;
  top: 842px;
`;

const StyledMaterialVisibility = styled(MaterialVisibility)`
  width: 47px;
  height: 32px;
  position: fixed;
  left: 1215px;
  top: 858px;
`;

const StyledWeatherForecastDetails = styled.div`
  display: flex;
  position: fixed;
  flex-wrap: wrap;
  width: 1366px;
  top: 613px;
`;

const StyledLine = styled.div`
  position: fixed;
  top: 510px;
  width: 1366px;
  height: 0.5px;
  background-color: #ffffff;
`;

const StyledText = styled.div`
  position: fixed;
  width: 190px;
  height: 31px;
  top: 542px;
  left: 71px;
  font-size: 26px;
  color: #ffffff;
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  color: #101010;
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
  padding-left: 31px;
  flex-direction: column;
  margin-right: 24px;

  &:first-child {
    margin-top: 10px;
    margin-left: 71px;
  }
  &:nth-child(2) {
    margin-top: 10px;
  }
  &:nth-child(3) {
    margin-top: 10px;
  }
  &:nth-child(4) {
    margin-top: 10px;
  }

  &:nth-child(5) {
    margin-top: 20px;
    margin-left: 71px;
  }
  &:nth-child(6) {
    margin-top: 20px;
  }
  &:nth-child(7) {
    margin-top: 20px;
  }
  &:nth-child(8) {
    margin-top: 20px;
  }
`;

const StyledTitle = styled.div<StyledTitleProps>`
  font-size: 19px;
  color: #072a41;
  top: ${(props) =>
    props.index >= 3 ? '650px' : '816px'}; // Используем props.index

  ${(props) =>
    props.index === 0 &&
    `
    position: fixed;
    top: 650px;
 `}

  ${(props) =>
    props.index === 0 &&
    `
    position: fixed;
    top: 650px;
 `}

    ${(props) =>
    props.index === 1 &&
    `
    position: fixed;
    top: 650px;
 `}

    ${(props) =>
    props.index === 2 &&
    `
    position: fixed;
    top: 650px;
 `}

    ${(props) =>
    props.index === 3 &&
    `
    position: fixed;
    top: 650px;
 `}

    ${(props) =>
    props.index === 4 &&
    `
    position: fixed;
    top: 816px;
 `}

    ${(props) =>
    props.index === 5 &&
    `
    position: fixed;
    top: 816px;
 `}

    ${(props) =>
    props.index === 6 &&
    `
    position: fixed;
    top: 816px;
 `}

    ${(props) =>
    props.index === 7 &&
    `
    position: fixed;
    top: 816px;
 `}
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

const StyledSunrese = styled.div`
  position: fixed;
  width: 134px;
  height: 40px;
  left: 102px;
  top: 681px;
  font-size: 34px;
  color: black;

  span {
    font-size: 20px;
    color: black;
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
`;

const StyledPrecipitation = styled.div`
  width: 72px;
  height: 40px;
  top: 681px;
  left: 726px;
  font-size: 34px;
  color: black;
`;

const StyledHumidity = styled.div`
  position: fixed;
  width: 74px;
  height: 42px;
  top: 681px;
  left: 1030px;
  font-size: 35px;
  color: #072a41;
`;

const StyledWind = styled.div`
  position: fixed;
  width: 130px;
  height: 42px;
  left: 102px;
  top: 847px;
  font-size: 35px;
  color: black;
`;

const StyledPressure = styled.div`
  position: fixed;
  width: 150px;
  height: 42px;
  left: 406px;
  top: 847px;
  font-size: 35px;
  color: black;
`;

const StyledFeelsLike = styled.div`
  position: fixed;
  width: 80px;
  height: 40px;
  left: 726px;
  top: 847px;
  font-size: 34px;
  color: black;
`;

const StyledVisibility = styled.div`
  position: fixed;
  width: 96px;
  height: 40px;
  text-outline: 847px;
  top: 847px;
  left: 1030px;
  font-size: 34px;
  color: black;
`;

function convertTimestampToHoursAndMinutes(unixTimestamp) {
  let dateObj = new Date(unixTimestamp * 1000);
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let formattedTime =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0');
  return formattedTime;
}

export const WeatherForecastDetails = () => {
  const [searchCity, setSearchCity] = useState('Berlin');
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'f6ff5e7dcd656163a217302f41dc2916';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);

        const sunrise = response.data.sys.sunrise;
        const sunset = response.data.sys.sunset;
        const humidity = `${response.data.main.humidity} %`;
        const wind = `${Math.round(response.data.wind.speed)} km/h`;
        const pressure = `${response.data.main.pressure} hPa`;
        const feelsLike = `${Math.round(response.data.main.feels_like)} °`;
        const visibility = `${response.data.visibility / 1000} km`;

        const sunriseTime = convertTimestampToHoursAndMinutes(sunrise) + 'am';
        const sunsetTime = convertTimestampToHoursAndMinutes(sunset) + 'pm';

        setForecastData([
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
        ]);
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
      }
    };

    fetchWeatherData();
  }, []);
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
            {item.image}
            <StyledTitle index={index}>{item.title}</StyledTitle>

            <StyledSunrese>{item.sunriseTime}</StyledSunrese>

            <StyledSunset>{item.sunsetTime}</StyledSunset>

            <StyledPrecipitation></StyledPrecipitation>

            <StyledHumidity>{item.humidity}</StyledHumidity>
            <StyledWind>{item.wind}</StyledWind>
            <StyledPressure>{item.pressure}</StyledPressure>
            <StyledFeelsLike>{item.feelsLike}</StyledFeelsLike>
            <StyledVisibility>{item.visibility}</StyledVisibility>
          </WeatherCard>
        ))}
      </StyledWeatherForecastDetails>
    </div>
  );
};
