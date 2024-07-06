import React from 'react';
import styled from 'styled-components';
import { InputSearch } from '../InputSearch/InputSearch';

const Container = styled.div`
  justify-content: space-between;
  align-items: center;
`;

export const WeatherHeader = () => {
  const handleCityChange = (city: string) => {
    console.log(city);
  };

  return (
    <Container>
      <InputSearch onCityChange={handleCityChange} />
    </Container>
  );
};
