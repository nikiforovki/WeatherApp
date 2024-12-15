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

const InputSkeletonContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 71px;
  z-index: 90;
  display: flex;
  align-items: center;

  @media (max-width: 375px) {
    margin-left:10px
    width: 100px;
  }

  @media (max-width: 1024px) {
 margin-left:10px
    width: 200px;
  }
`;
const AdaptiveSkeleton = styled(Skeleton)`
  width: 100%;
  height: 38px;

  @media (max-width: 375px) {
    height: 38px;
  }

  @media (max-width: 1024px) {
    height: 38px;
  }
`;

const StyledBtn = styled.div`
  position: fixed;
  top: 30px;
  left: 1030px;
`;

const StyledToggleTheme = styled.div`
  position: fixed;
  top: 35px;
  left: 1225px;
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
          <Skeleton height={38} width={950} />
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
