import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const StyledSkeletonToday = styled.div`
  position: fixed;
  top: 150px;
  left: 110px;
`;

const StyledSkeletonWeather = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  top: 613px;
  left: 71px;
  gap: 24px;
  max-width: 1280px;
  overflow: hidden;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  @media (max-width: 375px) {
    max-width: 300px;
    left: 30px;
    top: 500px;
  }

  @media (max-width: 1024px) {
    width: 660px;
    left: 70px;
    top: 900px;
  }
`;

// const InputSkeletonContainer = styled.div`
//   position: fixed;x
//   top: 30px;
//   left: 71px;
//   z-index: 90;
//   display: flex;
//   align-items: center;

//   @media (max-width: 375px) {
//     margin-width: 10px;
//     top: 15px; // Можно увеличить верхнюю границу для лучшей видимости на маленьких экранах
//     left: 5px; // Сдвигаем слева для более удобного размещения
//   }

//   @media (max-width: 1024px) {
//    margin-width: 10px;
//     top: 25px; // Аналогично, можно скорректировать верхнюю границу
//     left: 10px; // Скорректируем положение слева
//   }
// `;

const InputSkeletonContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 71px;
  z-index: 90;
  display: flex;
  align-items: center;
  width: 950px; // Указываем фиксированную ширину
  height: 38px; // Указываем фиксированную высоту

  @media (max-width: 375px) {
    top: 15px; // Можно увеличить верхнюю границу для лучшей видимости на маленьких экранах
    left: 5px; // Сдвигаем слева для более удобного размещения
  }

  @media (max-width: 1024px) {
    top: 25px; // Аналогично, можно скорректировать верхнюю границу
    left: 10px; // Скорректируем положение слева
  }
`;
const AdaptiveSkeleton = styled(Skeleton)`
  width: 950px;
  height: 38px;

  @media (max-width: 375px) {
    height: 38px;
    width: 200px;
  }

  @media (max-width: 1024px) {
    width: 400px;
    height: 38px;
  }
`;

const StyledBtn = styled.div`
  position: fixed;
  top: 30px;
  left: 1030px;
  width: 100px; // Базовая ширина
  height: 50px; // Базовая высота

  @media (max-width: 375px) {
    top: 30px;
    left: 1030px;
    width: 80px; // Уменьшаем ширину на маленьких экранах
    height: 40px; // Уменьшаем высоту на маленьких экранах
  }

  @media (max-width: 1024px) {
    top: 30px;
    left: 450px;
    width: 90px; // Средняя ширина для средних экранов
    height: 45px; // Средняя высота для средних экранов
  }
`;

const StyledToggleTheme = styled.div`
  position: fixed;
  top: 35px;
  left: 1225px;
  width: 120px; // Базовая ширина
  height: 60px; // Базовая высота

  @media (max-width: 375px) {
    top: 30px;
    left: 430px;
    width: 100px; // Уменьшаем ширину на маленьких экранах
    height: 50px; // Уменьшаем высоту на маленьких экранах
  }

  @media (max-width: 1024px) {
    top: 30px;
    left: 630px;
    width: 110px; // Средняя ширина для средних экранов
    height: 55px; // Средняя высота для средних экранов
  }
`;

const WeatherSkeleton = () => {
  return (
    <SkeletonTheme baseColor='#FFFFFF' highlightColor='#1AADE3'>
      <div>
        <StyledSkeletonToday>
          <Skeleton height={300} width={250} borderRadius={20} />
        </StyledSkeletonToday>
        <StyledSkeletonWeather>
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
          <Skeleton height={146} width={288} />
        </StyledSkeletonWeather>
        <InputSkeletonContainer>
          {/* <Skeleton height={38} width={950} /> */}
          <AdaptiveSkeleton />
        </InputSkeletonContainer>
        <StyledBtn>
          <Skeleton height={38} width={163} borderRadius={29} />
        </StyledBtn>
        <StyledToggleTheme>
          <Skeleton height={30} width={65} borderRadius={29} />
        </StyledToggleTheme>
      </div>
    </SkeletonTheme>
  );
};

export default WeatherSkeleton;
