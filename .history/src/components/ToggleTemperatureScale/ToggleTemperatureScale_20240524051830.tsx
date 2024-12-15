import React, { useState } from 'react';
import styled from 'styled-components';

xport const TemperatureScaleToggle = ({ onScaleChange }: { onScaleChange: (scale: 'C' | 'K') => void }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onScaleChange(isActive? 'C' : 'K');
  };

  return (
    <ToggleContainer onClick={handleClick}>
      {isActive? (
        <ActiveToggleButton>C</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>C</InactiveToggleButton>
      )}
      <SlashButton>/</SlashButton>
      {!isActive? (
        <ActiveToggleButton>K</ActiveToggleButton>
      ) : (
        <InactiveToggleButton>K</InactiveToggleButton>
      )}
    </ToggleContainer>
  );
};
