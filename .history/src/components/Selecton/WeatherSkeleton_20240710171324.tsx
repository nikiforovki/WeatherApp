import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const StyledSkeletonToday = styled.div`
  position: fixed;
  top: 90px;
  left: 90px;
  @media (min-width: 375px) and (max-width: 768px) {
    top: 90px;
    left: 200px;

    @media (min-width: 769px) and (max-width: 1024px) {
      top: 90px;
      left: 200px;
    }

    @media (min-width: 1025px) and (max-width: 1366px) {
      top: 90px;
      left: 90px;
    }

    @media (min-width: 1367px) {
      top: 90px;
      left: 90px;
    }
  }
`;

const StyledSkeletonWeather = styled.div`
  // position: fixed;
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

  @media (min-width: 375px) and (max-width: 768px) {
    top: 1613px;
    width: 320px;
    margin-left: 100px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    top: 1613px;
    width: 900px;
    margin-left: 100px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    top: 1613px;
    width: 1200px;
    margin-left: 100px;
  }

  @media (min-width: 1367px) {
    top: 1613px;
    width: 1300px;
    margin-left: 71px;
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

  @media (min-width: 375px) and (max-width: 768px) {
  width:1000px
    top: 30px;
    left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
  width:1000px
    top: 30px;
    left: 0px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
  width:1000px
    top: 30px;
    left: 0px;
  }

  @media (min-width: 1367px) {
  width:300px
    top: 30px;
    left: 0px;
  }
`;
const AdaptiveSkeleton = styled(Skeleton)`
position: fixed;
  width: 950px;
  height: 38px;

  // @media (max-width: 375px) {
  // width:300px
  //   height: 38px;
  //   width: 400px;
  // }

  // @media (max-width: 1024px) {
  // width:300px
  //   height: 38px;
  //   width: 400px;
  // }

  @media (min-width: 375px) and (max-width: 768px) {
  // margin-width: 100px;
   width:20px
    height: 38px;
    // width: 200px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
  width:20px
    height: 38px;
    // width: 200px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
  width:20px
    height: 38px;
    // width: 200px;
  }

  @media (min-width: 1367px) {
  width:20px
    height: 38px;
    // width: 200px;
  }
`;

const StyledBtn = styled.div`
  position: fixed;
  top: 30px;
  left: 1030px;
  width: 100px;
  height: 50px;

  // @media (max-width: 375px) {
  //   top: 30px;
  //   left: 440px;
  //   width: 80px;
  //   height: 40px;
  // }

  // @media (max-width: 1024px) {
  //   top: 30px;
  //   left: 440px;
  //   width: 90px;
  //   height: 45px;
  // }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 20px;
    margin-left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 380px;
    margin-left: 10px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    margin-left: 10px;
  }

  @media (min-width: 1367px) {
    margin-left: 2px;
  }
`;

const StyledToggleTheme = styled.div`
  position: fixed;
  top: 35px;
  left: 1230px;
  width: 120px;
  height: 60px;

  // @media (max-width: 375px) {
  //   top: 30px;
  //   left: 430px;
  //   width: 100px;
  //   height: 50px;
  // }

  // @media (max-width: 1024px) {
  //   top: 76px;
  //   left: 482px;
  //   width: 120px;
  //   height: 55px;
  // }

  @media (min-width: 375px) and (max-width: 768px) {
    width: 320px;
    margin-left: 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 380px;
    margin-left: 10px;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
    margin-left: 0px;
  }

  @media (min-width: 1367px) {
    margin-left: 0px;
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
