import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 29px;
  padding: 5px;
  cursor: pointer;

  @media (min-width: 375px) and (max-width: 768px) {
    top: 32px;
    left: 220px;
    width: 130px;
    height: 38px;
  }
  @media (min-width: 760px) and (max-width: 1024px) {
    top: 32px;
    left: 600px;
    width: 163px;
    height: 38px;
  }
  @media (min-width: 1024px) and (max-width: 1366px) {
    top: 32px;
    left: 850px;
    width: 163px;
    height: 38px;
  }
  @media (min-width: 1366px) and (max-width: 1920px) {
    top: 32px;
    left: 1132px;
    width: 163px;
    height: 38px;
  }

  @media (min-width: 1920px) {
    top: 32px;
    left: 1132px;
    width: 163px;
    height: 38px;
  }
`;

const ActiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgba(19, 38, 74, 0.2);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const InactiveToggleButton = styled.button`
  width: 12px;
  height: 22px;
  color: rgb(26, 175, 224);
  border: none;
  border-radius: 29px;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

const SlashButton = styled.button`
  width: 12px;
  height: 21px;
  color: rgb(16, 16, 16);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  background: none;
`;

export const TemperatureScaleToggle = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  };

  return (
    <ToggleContainer onClick={handleClick}>
      {isActive ? (
        <ActiveToggleButton>F</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>F</InactiveToggleButton>
      )}
      <SlashButton>/</SlashButton>
      {!isActive ? (
        <ActiveToggleButton>C</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>C</InactiveToggleButton>
      )}
    </ToggleContainer>
  );
};
