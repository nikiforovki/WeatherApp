// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../Redux/store/store';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import styled from 'styled-components';
// import {
//   selectSunrise,
//   selectSunset,
//   selectHumidity,
//   selectFeelsLike,
//   selectPrecipitation,
//   selectPressure,
//   selectWindSpeed,
//   selectVisibility,
// } from '../../Redux/slice/currentweatherSlice';

// import FeatherSunrise from '../../../public/assets/images/FeatherSunrise';
// import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
// import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
// import Exclusion from '../../../public/assets/images/IconExclusion.svg';
// import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
// import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
// import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
// import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';

// const SkeletonCard = styled.div`
//   width: 288px;
//   height: 146px;
//   background: linear-gradient(
//     to right,
//     rgba(255, 255, 255, 0.1),
//     rgba(255, 255, 255, 0.2)
//   );
//   border-radius: 4px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 10px;
//   pading-bottom: 50px;
// `;

// const Container = styled.div`
//   position: absolute;
//   display: flex;
//   flex-wrap: wrap;
//   margin-left: 71px;
//   top: 550px;
//   max-width: 1280px;
//   gap: 24px;

//   @media (min-width: 375px) and (max-width: 480px) {
//     margin-top: 750px;
//     margin-left: 100px;
//     margin-bottom: 20px;
//   }
//   @media (min-width: 481px) and (max-width: 768px) {
//     margin-top: 400px;
//     margin-left: 100px;
//     margin-bottom: 20px;
//   }

//   @media (min-width: 769px) and (max-width: 879px) {
//     margin-top: 400px;
//     margin-left: 150px;
//     margin-bottom: 20px;
//   }
//   @media (min-width: 880px) and (max-width: 1024px) {
//     margin-top: 150px;
//     margin-left: 71px;
//     margin-bottom: 20px;
//   }

//   @media (min-width: 1025px) and (max-width: 1366px) {
//     margin-top: 150px;
//     margin-left: 71px;
//     margin-bottom: 100px;
//   }

//   @media (min-width: 1367px) {
//     margin-top: 100px;
//     margin-left: 71px;
//     margin-bottom: 100px;
//   }
// `;

// const WeatherCard = styled.div`
//   width: 288px;
//   height: 146px;
//   background-color: var(--weatherCardBackground, rgb(255, 255, 255));
//   border-radius: 4px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const StyledDescription = styled.div`
//   position: relative;
//   font-size: 19px;
//   color: var(--description-text-color, #6e6c6c);
//   margin-right: auto;
//   left: 31px;
//   top: 37px;
//   opacity: 0.6;
// `;

// const StyledImg = styled.div`
//   position: relative;
//   width: 46px;
//   height: 41px;
//   left: 100px;
//   top: 50px;
//   pading: 0;
// `;

// const StyledValue = styled.div`
//   position: relative;
//   font-size: 35px;
//   color: var(--value-text-color, #6e6c6c);
//   margin-right: auto;
//   left: 31px;
//   top: 0px;
//   opacity: 0.85;
// `;

// const SkeletonWrapper = styled.div`
//   // @media (min-width: 375px) and (max-width: 768px) {
//   //   margin-top: 350px;
//   //   margin-left: 150px;
//   //   margin-bottom: 20px;
//   // }

//   // @media (min-width: 769px) and (max-width: 879px) {
//   //   margin-top: 350px;
//   //   margin-left: 150px;
//   //   margin-bottom: 20px;
//   // }
//   // @media (min-width: 880px) and (max-width: 1024px) {

//   // }

//   // @media (min-width: 1025px) and (max-width: 1366px) {

//   // }

//   // @media (min-width: 1367px) {

//   // }
//   position: relative;
//   width: 1367px;
//   left: 71px;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 24px;

//   @media (min-width: 375px) and (max-width: 768px) {
//     width: 280px;
//     left: 150px;
//     gap: 24px;
//   }

//   @media (min-width: 769px) and (max-width: 1024px) {
//     width: 800px;
//     left: 150px;
//     gap: 24px;
//   }

//   @media (min-width: 1025px) and (max-width: 1366px) {
//     width: 1100px;
//     left: 71px;
//     gap: 24px;
//     margin-top: 150px;
//     margin-bottom: 100px;
//   }

//   @media (min-width: 1367px) {
//     width: 1300px;
//     left: 71px;
//     gap: 24px;
//     margin-top: 100px;
//     margin-bottom: 100px;
//   }
// `;

// const StyledLine = styled.div`
//   top: 510px;
//   left: 0;
//   height: 0.5px;
//   border: 1px solid var(--weatherCardline);

//   @media (min-width: 375px) and (max-width: 768px) {
//     top: 30px;
//   }
//   @media (min-width: 769px) and (max-width: 1024px) {
//     top: 90px;
//   }

//   @media (min-width: 1025px) and (max-width: 1294px) {
//     top: 510px;
//   }
//   @media (min-width: 1295px) and (max-width: 1366px) {
//     margin-top: 150px;
//   }

//   @media (min-width: 1367px) {
//     margin-top: 150px;
//   }
// `;
// const StyledText = styled.div`
//   font-size: 24px;
//   color: var(--weatherCardline);
//   margin-left: 71px;
//   width: 190px;
//   height: 31px;

//   @media (min-width: 375px) and (max-width: 768px) {
//     margin-top: 32px;
//     margin-left: 150px;
//   }
//   @media (min-width: 769px) and (max-width: 1024px) {
//     margin-top: 32px;
//     margin-left: 150px;
//   }

//   @media (min-width: 1025px) and (max-width: 1294px) {
//     margin-top: 32px;
//     margin-left: 71px;
//   }
//   @media (min-width: 1295px) and (max-width: 1366px) {
//     margin-top: 32px;
//     margin-left: 71px;
//   }

//   @media (min-width: 1367px) {
//     margin-top: 32px;
//     margin-left: 71px;
//   }
// `;

// export const WeatherForecastDetails: React.FC = () => {
//   const dispatch = useDispatch();
//   const weatherData = useSelector(
//     (state: RootState) => state.weather?.weatherData,
//   );
//   const error = useSelector((state: RootState) => state.error);
//   const [showError, setShowError] = useState(false);
//   const sunrise = useSelector(selectSunrise);
//   const sunset = useSelector(selectSunset);
//   const humidity = useSelector(selectHumidity);
//   const feelsLike = useSelector(selectFeelsLike);
//   const roundFeelsLike = Math.round(feelsLike);
//   const pressure = useSelector(selectPressure);
//   const precipitation = useSelector(selectPrecipitation);
//   const visibility = useSelector(selectVisibility);
//   const windSpeed = useSelector(selectWindSpeed);
//   const roundedWindSpeed = Math.round(windSpeed);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadingStatus, setLoadingStatus] = useState(false); // Добавлено новое состояние

//   useEffect(() => {
//     if (error) {
//       setShowError(true);
//     } else if (!isLoading) {
//       setLoadingStatus(false); // Устанавливаем статус загрузки в false
//     }
//   }, [error, isLoading]);

//   if (showError) {
//     return <div></div>;
//   }

//   if (isLoading) {
//     return (
//       <SkeletonTheme color='#888' highlightColor='#ddd'>
//         <SkeletonWrapper>
//           {[...Array(8)].map((_, i) => (
//             <SkeletonCard key={i}>
//               <Skeleton height={140} width={280} borderRadius={4} />
//             </SkeletonCard>
//           ))}
//         </SkeletonWrapper>
//       </SkeletonTheme>
//     );
//   }

//   const convertCelsiusToFahrenheit = (temp: number) => {
//     return Math.round((temp * 9) / 5 + 32);
//   };

//   const visibilityKm = visibility / 1000;

//   const sunsetTime = sunset
//     ? new Date(sunset * 1000)
//         .toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//         })
//         .toLowerCase()
//     : 'Неизвестно';

//   const sunriseTime = sunrise
//     ? new Date(sunrise * 1000)
//         .toLocaleTimeString('en-US', {
//           hour: '2-digit',
//           minute: '2-digit',
//         })
//         .toLowerCase()
//     : 'Неизвестно';

//   const cardsData = [
//     { description: 'SUNRISE', img: <FeatherSunrise /> },
//     { description: 'SUNSET', img: <FeatherSunset /> },
//     { description: 'PRECIPITATION', img: <WeatherRaindrop /> },
//     { description: 'HUMIDITY', img: <Exclusion /> },
//     { description: 'WIND', img: <AwesomeWind /> },
//     { description: 'PRESSURE', img: <GroupArrow /> },
//     { description: 'FEELS LIKE', img: <AwesomeTemperatureHigh /> },
//     { description: 'VISIBILITY', img: <MaterialVisibility /> },
//   ];

//   const sunriseIndex = cardsData.findIndex(
//     (card) => card.description === 'SUNRISE',
//   );

//   const sunsetIndex = cardsData.findIndex(
//     (card) => card.description === 'SUNSET',
//   );

//   const precrationIndex = cardsData.findIndex(
//     (card) => card.description === 'PRECIPITATION',
//   );

//   const humidityIndex = cardsData.findIndex(
//     (card) => card.description === 'HUMIDITY',
//   );
//   const windIndex = cardsData.findIndex((card) => card.description === 'WIND');

//   const pressureIndex = cardsData.findIndex(
//     (card) => card.description === 'PRESSURE',
//   );

//   const feelslikeIndex = cardsData.findIndex(
//     (card) => card.description === 'FEELS LIKE',
//   );

//   const visibilityIndex = cardsData.findIndex(
//     (card) => card.description === 'VISIBILITY',
//   );

//   return (
//     <div>
//       <StyledLine />
//       <StyledText>Weather Details</StyledText>
//       <Container>
//         {cardsData.map((card, index) => (
//           <WeatherCard key={index}>
//             <StyledDescription>{card.description}</StyledDescription>
//             <StyledImg>{card.img}</StyledImg>

//             {index === sunriseIndex && sunrise !== undefined && (
//               <StyledValue>{sunriseTime}</StyledValue>
//             )}

//             {index === sunsetIndex && sunset !== undefined && (
//               <StyledValue>{sunsetTime}</StyledValue>
//             )}
//             {index === humidityIndex && humidity !== undefined && (
//               <StyledValue>{humidity}%</StyledValue>
//             )}
//             {index === windIndex && windSpeed !== undefined && (
//               <StyledValue>{roundedWindSpeed} km/h</StyledValue>
//             )}
//             {index === precrationIndex && precipitation !== undefined && (
//               <StyledValue>{precipitation} % </StyledValue>
//             )}
//             {index === pressureIndex && pressure !== undefined && (
//               <StyledValue>{pressure} hPa</StyledValue>
//             )}
//             {index === feelslikeIndex && feelsLike !== undefined && (
//               <StyledValue>{roundFeelsLike}°</StyledValue>
//             )}
//             {index === visibilityIndex && visibility !== undefined && (
//               <StyledValue>{visibilityKm} km/h</StyledValue>
//             )}
//           </WeatherCard>
//         ))}
//       </Container>
//     </div>
//   );
// };

//Работает
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import {
  selectSunrise,
  selectSunset,
  selectHumidity,
  selectFeelsLike,
  selectPrecipitation,
  selectPressure,
  selectWindSpeed,
  selectVisibility,
} from '../../Redux/slice/currentweatherSlice';

import FeatherSunrise from '../../../public/assets/images/FeatherSunrise';
import FeatherSunset from '../../../public/assets/images/IconFeatherSunset.svg';
import WeatherRaindrop from '../../../public/assets/images/IconWeatherRaindrop.svg';
import Exclusion from '../../../public/assets/images/IconExclusion.svg';
import AwesomeWind from '../../../public/assets/images/IconAwesomeWind.svg';
import GroupArrow from '../../../public/assets/images/IconGroupArrow.svg';
import AwesomeTemperatureHigh from '../../../public/assets/images/IconAwesomeTemperatureHigh.svg';
import MaterialVisibility from '../../../public/assets/images/IconMaterialVisibility.svg';

const SkeletonCard = styled.div`
  width: 288px;
  height: 146px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  pading-bottom: 50px;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  margin-left: 71px;
  top: 550px;
  max-width: 1280px;
  gap: 24px;

  @media (min-width: 375px) and (max-width: 480px) {
    margin-top: 750px;
    margin-left: 100px;
    margin-bottom: 20px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 400px;
    margin-left: 100px;
    margin-bottom: 20px;
  }

  @media (min-width: 769px) and (max-width: 879px) {
    margin-top: 400px;
    margin-left: 150px;
    margin-bottom: 20px;
  }
  @media (min-width: 880px) and (max-width: 1024px) {
    margin-top: 150px;
    margin-left: 71px;
    margin-bottom: 20px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    margin-top: 150px;
    margin-left: 71px;
    margin-bottom: 100px;
  }

  @media (min-width: 1367px) {
    margin-top: 100px;
    margin-left: 71px;
    margin-bottom: 100px;
  }
`;

const WeatherCard = styled.div`
  width: 288px;
  height: 146px;
  background-color: var(--weatherCardBackground, rgb(255, 255, 255));
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledDescription = styled.div`
  position: relative;
  font-size: 19px;
  color: var(--description-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: 37px;
  opacity: 0.6;
`;

const StyledImg = styled.div`
  position: relative;
  width: 46px;
  height: 41px;
  left: 100px;
  top: 50px;
  pading: 0;
`;

const StyledValue = styled.div`
  position: relative;
  font-size: 35px;
  color: var(--value-text-color, #6e6c6c);
  margin-right: auto;
  left: 31px;
  top: 0px;
  opacity: 0.85;
`;

const SkeletonWrapper = styled.div`
  // @media (min-width: 375px) and (max-width: 768px) {
  //   margin-top: 350px;
  //   margin-left: 150px;
  //   margin-bottom: 20px;
  // }

  // @media (min-width: 769px) and (max-width: 879px) {
  //   margin-top: 350px;
  //   margin-left: 150px;
  //   margin-bottom: 20px;
  // }
  // @media (min-width: 880px) and (max-width: 1024px) {

  // }

  // @media (min-width: 1025px) and (max-width: 1366px) {

  // }

  // @media (min-width: 1367px) {

  // }
  position: relative;
  width: 1367px;
  left: 71px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  @media (min-width: 375px) and (max-width: 768px) {
    width: 280px;
    left: 150px;
    gap: 24px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 800px;
    left: 150px;
    gap: 24px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    width: 1100px;
    left: 71px;
    gap: 24px;
    margin-top: 150px;
    margin-bottom: 100px;
  }

  @media (min-width: 1367px) {
    width: 1300px;
    left: 71px;
    gap: 24px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
`;

const StyledLine = styled.div`
  top: 510px;
  left: 0;
  height: 0.5px;
  border: 1px solid var(--weatherCardline);

  @media (min-width: 375px) and (max-width: 768px) {
    top: 30px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 90px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    top: 510px;
  }
  @media (min-width: 1295px) and (max-width: 1366px) {
    margin-top: 150px;
  }

  @media (min-width: 1367px) {
    margin-top: 150px;
  }
`;
const StyledText = styled.div`
  font-size: 24px;
  color: var(--weatherCardline);
  margin-left: 71px;
  width: 190px;
  height: 31px;

  @media (min-width: 375px) and (max-width: 768px) {
    margin-top: 32px;
    margin-left: 150px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-top: 32px;
    margin-left: 150px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    margin-top: 32px;
    margin-left: 71px;
  }
  @media (min-width: 1295px) and (max-width: 1366px) {
    margin-top: 32px;
    margin-left: 71px;
  }

  @media (min-width: 1367px) {
    margin-top: 32px;
    margin-left: 71px;
  }
`;

export const WeatherForecastDetails: React.FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather?.weatherData,
  );
  const error = useSelector((state: RootState) => state.error);
  const [showError, setShowError] = useState(false);
  const sunrise = useSelector(selectSunrise);
  const sunset = useSelector(selectSunset);
  const humidity = useSelector(selectHumidity);
  const feelsLike = useSelector(selectFeelsLike);
  const roundFeelsLike = Math.round(feelsLike);
  const pressure = useSelector(selectPressure);
  const precipitation = useSelector(selectPrecipitation);
  const visibility = useSelector(selectVisibility);
  const windSpeed = useSelector(selectWindSpeed);
  const roundedWindSpeed = Math.round(windSpeed);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setIsLoading(false);
    }
  }, [error]);

  if (showError) {
    return <div></div>;
  }

  if (isLoading) {
    return (
      <SkeletonTheme color='#888' highlightColor='#ddd'>
        <SkeletonWrapper>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i}>
              <Skeleton height={140} width={280} borderRadius={4} />
            </SkeletonCard>
          ))}
        </SkeletonWrapper>
      </SkeletonTheme>
    );
  }

  const convertCelsiusToFahrenheit = (temp: number) => {
    return Math.round((temp * 9) / 5 + 32);
  };

  const visibilityKm = visibility / 1000;

  const sunsetTime = sunset
    ? new Date(sunset * 1000)
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase()
    : 'Неизвестно';

  const sunriseTime = sunrise
    ? new Date(sunrise * 1000)
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase()
    : 'Неизвестно';

  const cardsData = [
    { description: 'SUNRISE', img: <FeatherSunrise /> },
    { description: 'SUNSET', img: <FeatherSunset /> },
    { description: 'PRECIPITATION', img: <WeatherRaindrop /> },
    { description: 'HUMIDITY', img: <Exclusion /> },
    { description: 'WIND', img: <AwesomeWind /> },
    { description: 'PRESSURE', img: <GroupArrow /> },
    { description: 'FEELS LIKE', img: <AwesomeTemperatureHigh /> },
    { description: 'VISIBILITY', img: <MaterialVisibility /> },
  ];

  const sunriseIndex = cardsData.findIndex(
    (card) => card.description === 'SUNRISE',
  );

  const sunsetIndex = cardsData.findIndex(
    (card) => card.description === 'SUNSET',
  );

  const precrationIndex = cardsData.findIndex(
    (card) => card.description === 'PRECIPITATION',
  );

  const humidityIndex = cardsData.findIndex(
    (card) => card.description === 'HUMIDITY',
  );
  const windIndex = cardsData.findIndex((card) => card.description === 'WIND');

  const pressureIndex = cardsData.findIndex(
    (card) => card.description === 'PRESSURE',
  );

  const feelslikeIndex = cardsData.findIndex(
    (card) => card.description === 'FEELS LIKE',
  );

  const visibilityIndex = cardsData.findIndex(
    (card) => card.description === 'VISIBILITY',
  );

  return (
    <div>
      <StyledLine />
      <StyledText>Weather Details</StyledText>
      <Container>
        {cardsData.map((card, index) => (
          <WeatherCard key={index}>
            <StyledDescription>{card.description}</StyledDescription>
            <StyledImg>{card.img}</StyledImg>

            {index === sunriseIndex && sunrise !== undefined && (
              <StyledValue>{sunriseTime}</StyledValue>
            )}

            {index === sunsetIndex && sunset !== undefined && (
              <StyledValue>{sunsetTime}</StyledValue>
            )}
            {index === humidityIndex && humidity !== undefined && (
              <StyledValue>{humidity}%</StyledValue>
            )}
            {index === windIndex && windSpeed !== undefined && (
              <StyledValue>{roundedWindSpeed} km/h</StyledValue>
            )}
            {index === precrationIndex && precipitation !== undefined && (
              <StyledValue>{precipitation} % </StyledValue>
            )}
            {index === pressureIndex && pressure !== undefined && (
              <StyledValue>{pressure} hPa</StyledValue>
            )}
            {index === feelslikeIndex && feelsLike !== undefined && (
              <StyledValue>{roundFeelsLike}°</StyledValue>
            )}
            {index === visibilityIndex && visibility !== undefined && (
              <StyledValue>{visibilityKm} km/h</StyledValue>
            )}
          </WeatherCard>
        ))}
      </Container>
    </div>
  );
};
