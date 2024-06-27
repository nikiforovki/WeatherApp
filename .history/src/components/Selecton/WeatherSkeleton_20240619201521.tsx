import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const StyledSkeletonToday = styled.div`
  position: fixed;
  top: 150px;
  left: 110px;
`;

// const StyledSkeletonHurl = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   top: 200px;
//   left: 487px;
//   gap: 24px;

//   @media (max-width: 375px) {
//   width:600px
//     left: 100px;
//     top: 500px;
//   }

//   @media (max-width: 1024px) {
//     width: 600px;
//     left: 70px;
//     top: 500px;
//   }
// `;

const StyledSkeletonWeather = styled.div`
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  top: 613px;
  left: 71px;
  gap: 24px;
  border-color: rgba(255, 255, 255,
  overflow: hidden; // Предотвращает выход содержимого за границы
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  @media (max-width: 375px) {
  width:1100px
    left: 30px;
    top: 500px;
  }

  @media (max-width: 1024px) {
  width:1100px
    left: 70px;
    top: 900px;
  }
`;

const InputSkeletonContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 71px;
  z-index: 90;
`;

const StyledBtn = styled.div`
  position: fixed;
  top: 30px;
  left: 1050px;
`;

const StyledToggleTheme = styled.div`
  position: fixed;
  top: 35px;
  left: 1250px;
`;

const WeatherSkeleton = () => {
  return (
    <SkeletonTheme color='#FFFFFF' highlightColor='#1AADE3'>
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
          <Skeleton height={38} width={950} />
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
