import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayWeatherContainer from '../TodayWeatherContainer/TodayWeatherContainer';
import HourlyWeatherForecast from '../HourlyWeatherForecast/HourlyWeatherForecast';
import { WeatherForecastDetails } from '../WeatherForecastDetails/WeatherForecastDetails';

export const WeatherSummary = () => {
  return (
    <>
      <TodayWeatherContainer />
      <HourlyWeatherForecast />
      <WeatherForecastDetails />
    </>
  );
};
