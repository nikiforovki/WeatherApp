import React, { useState } from 'react';
import styled from 'styled-components';
import IconСloudСomputing from '../../../public/assets/images/IconСloudСomputing.svg';

const BoxStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 24px;
  top: 213px;
  left: 591px;
`;

const StyledBoxText = styled.div`
  width: 80px;
  height: 20px;
  font-size: 22px;
  color: #ffffff;
`;

const StyledTime = styled.div`
  width: 63px;
  height: 26px;
  left: 600px;
  font-size: 20px;
  color: #fdfdfd;
`;

const StyledTemperature = styled.div`
  position: relative;
  width: 34px;
  height: 31px;
  top: 90px;
  left: 30px;
  font-size: 26px;
  color: #fdfdfd;
`;

const StyledBoxFon = styled.div`
  width: 80px;
  height: 120px;
  top: 255px;
  left: 591px;
  background-color: rgba(26, 32, 33, 0.3);
  border-radius: 40px;
  gap: 24px;

  &:first-child {
    margin-left: 71px;
  }

  &:nth-child(1) {
    margin-top: 17px;
  }

  &:nth-child(2) {
    margin-top: 17px;
  }

  &:nth-child(3) {
    margin-top: 17px;
  }

  &:nth-child(4) {
    margin-top: 17px;
  }

  &:nth-child(5) {
    margin-top: 17px;
  }

  &:nth-child(6) {
    margin-top: 17px;
  }
`;

const StyledIconСloudСomputing = styled.div`
  width: 59px;
  height: 42px;
  margin-left: 10px;
  top: 271px;
`;

const HourlyWeatherForecast = () => {
  const [forecastData, setForecastData] = useState([
    { time: '12 pm', temperature: 20 },
    { time: '1 pm', temperature: 20 },
    { time: '2 pm', temperature: 20 },
    { time: '3 pm', temperature: 20 },
    { time: '4 pm', temperature: 20 },
    { time: '5 pm', temperature: 20 },
    { time: '6 pm', temperature: 20 },
  ]);

  return (
    <BoxStyled>
      {forecastData.map((item, index) => (
        <div key={index}>
          <StyledBoxText>
            <StyledTime>{item.time}</StyledTime>
            <StyledTemperature>{item.temperature}</StyledTemperature>
            <StyledIconСloudСomputing>
              <IconСloudСomputing />
            </StyledIconСloudСomputing>
          </StyledBoxText>
          <StyledBoxFon />
        </div>
      ))}
    </BoxStyled>
  );
};

export default HourlyWeatherForecast;
