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
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: -150px;
  margin-left: 487px;
  width: 900px;
  // max-width: 100%; // Задаем максимальную ширину контейнера

  @media (max-width: 375px) {
    // width: 280px;
    margin-left: 10px;
    margin-top: 500px;
  }

  @media (max-width: 1024px) {
    // width: 500px;
    margin-left: 10px;
    margin-top: 100px;
    padding-top: 40px;
  }
`;

const WeatherCard = styled.div`
  position: relative;
  // position:fixed
  width: 80px;
  height: 120px;
  background-color: rgba(26, 32, 33, 0.3);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
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
  margin-top: 20px;

  @media (max-width: 375px) {
    top: 650px;
  }

  @media (max-width: 735px) {
    top: 750px;
  }

  @media (max-width: 1024px) {
    top: 820px;
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

  // @media (max-width: 1024px) {
  //   display: none;
  //   bottom: 20px;
  // }
`;
const StyledNowTemperature = styled.div`
  position: absolute;
  width: 24px;
  height: 31px;
  left: 20px;
  top: 70px;
  font-size: 26px;
  color: var(--temperature-now-text-color);
  bottom: 20px;

  // @media (max-width: 1024px) {
  //   display: none;
  //   bottom: 20px;
  // }
`;

const StyledNowIcon = styled.div`
  position: absolute;
  width: 37px;
  height: 42px;
  left: 10px;
  top: 10px;
  bottom: 20px;
  // @media (max-width: 1024px) {
  //   display: none;
  //   bottom: 20px;
  // }
`;
const StyledTemperatureScaleToggle = styled.div`
  margin-top: -250px;
  margin-left: 650px;
  @media (max-width: 1024px) {
    margin-top: -250px;
    margin-left: 650px;
  }
  @media (max-width: 1024px) {
    margin-top: -550px;
    margin-left: 500px;
  }
`;

//рАБОТАЕТ
// const Container = styled.div`
//   position: fixed;
//   top: 255px;
//   left: 487px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 24px;
//   @media (max-width: 375px) {
//     width: 280px;
//     left: 10px;
//     top: 500px;
//     padding=top: 40px;
//   }

//   @media (max-width: 1024px) {
//     width: 500px;
//     left: 70px;
//     top: 500px;
//     padding-top: 40px;
//   }
// `;

// const WeatherCard = styled.div`
//   position: relative;
//   width: 80px;
//   height: 120px;
//   background-color: rgba(26, 32, 33, 0.3);
//   border-radius: 40px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding-top: 40px;
// `;

// const StyledText = styled.div`
//   position: absolute;
//   width: 80px;
//   height: 20px;
//   top: 0;
//   font-size: 22px;
//   color: var(--box-text-color, #ffffff);
//   gap: 10px;
// `;

// const StyledTime = styled.div`
//   position: absolute;
//   top: -40px;
//   left: 10px;
//   font-size: 22px;
//   color: var(--box-text-color, #ffffff);
// `;

// const StyledTemperature = styled.div`
//   position: relative;
//   width: 34px;
//   height: 31px;
//   top: 71px;
//   left: 25px;
//   font-size: 26px;
//   color: var(--temperature-text-color, #ffffff);
// `;

// const StyledIconСloudСomputing = styled.div`
//   position: relative;
//   top: -16px;
//   left: 10px;
//   width: 59px;
//   height: 42px;
// `;

// const SkeletonWrapper = styled.div`
//   position: fixed;
//   top: 255px;
//   left: 591px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 24px;

//   @media (max-width: 375px) {
//     width: 280px;
//     left: 10px;
//     top: 500px;
//     gap: 40px;
//   }

//   @media (max-width: 1024px) {
//     width: 500px;
//     left: 70px;
//     top: 500px;
//     gap: 40px;
//   }
// `;

// const StyledLine = styled.div`
//   position: fixed;
//   top: 510px;
//   left: 0;
//   width: 1366px;
//   height: 0.5px;
//   border: 1px solid var(--weatherCardline);
//   margin-top: 20px;

//   @media (max-width: 375px) {
//     top: 650px;
//   }

//   @media (max-width: 735px) {
//     top: 750px;
//   }

//   @media (max-width: 1024px) {
//     top: 820px;
//   }
// `;

// const SpecialWeatherCard = styled(WeatherCard)`
//   position: relactive;
//   background-color: rgba(255, 255, 255, 0.6);
// `;
// const StyledNowText = styled.div`
//   position: absolute;
//   width: 46px;
//   height: 26px;
//   top: -40px;
//   left: 20px;
//   font-size: 22px;
//   color: var(--now-text-color);

//   // @media (max-width: 1024px) {
//   //   display: none;
//   //   bottom: 20px;
//   // }
// `;
// const StyledNowTemperature = styled.div`
//   position: absolute;
//   width: 24px;
//   height: 31px;
//   left: 20px;
//   top: 70px;
//   font-size: 26px;
//   color: var(--temperature-now-text-color);
//   bottom: 20px;

//   // @media (max-width: 1024px) {
//   //   display: none;
//   //   bottom: 20px;
//   // }
// `;

// const StyledNowIcon = styled.div`
//   position: absolute;
//   width: 37px;
//   height: 42px;
//   left: 10px;
//   top: 10px;
//   bottom: 20px;
//   // @media (max-width: 1024px) {
//   //   display: none;
//   //   bottom: 20px;
//   // }
// `;

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
          ? hourlyTemp.slice(0, 8)
          : hourlyTemp
              .slice(0, 8)
              .map((temp: number) => Math.floor((temp * 9) / 5 + 32));
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
    return <div>Error occurred</div>;
  }

  return (
    <Container>
      <StyledTemperatureScaleToggle>
        <TemperatureScaleToggle
          onScaleChange={(scale) =>
            dispatch({ type: 'SET_TEMPERATURE_SCALE', payload: scale })
          }
        />
      </StyledTemperatureScaleToggle>
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
            {/* <TemperatureScaleToggle
              onScaleChange={(scale) =>
                dispatch({ type: 'SET_TEMPERATURE_SCALE', payload: scale })
              }
            /> */}
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
