import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const StyledSkeletonToday = styled.div`
  position: fixed;
  top: 90px;
  left: 90px;
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
    top: 2000px;
  }

  @media (max-width: 1024px) {
    width: 280px;
    left: 70px;
    top: 100px;
  }
`;

const InputSkeletonContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 71px;
  z-index: 90;
  display: flex;
  align-items: center;
  width: 950px;
  height: 38px;

  @media (max-width: 375px) {
    top: 15px;
    left: 5px;
  }

  @media (max-width: 1024px) {
    top: 25px;
    left: 10px;
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
  width: 100px;
  height: 50px;

  @media (max-width: 375px) {
    top: 30px;
    left: 440px;
    width: 80px;
    height: 40px;
  }

  @media (max-width: 1024px) {
    top: 30px;
    left: 440px;
    width: 90px;
    height: 45px;
  }
`;

const StyledToggleTheme = styled.div`
  position: fixed;
  top: 35px;
  left: 1230px;
  width: 120px;
  height: 60px;

  @media (max-width: 375px) {
    top: 30px;
    left: 430px;
    width: 100px;
    height: 50px;
  }

  @media (max-width: 1024px) {
    top: 76px;
    left: 482px;
    width: 120px;
    height: 55px;
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
