import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DarkModeContainer = styled.div`
  position: fixed;
  top: 0px;
  margin-left: 1280px;
`;

const DarkModeLabel = styled.label`
  width: 65px;
  height: 30px;
  // position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow:
    inset 0px 5px 15px rgba(110, 108, 108, 0),
    inset 0px -5px 15px rgb(108, 99, 255);
  cursor: pointer;
  transition: background 0.6s ease-in-out;

  &:after {
    content: '';
    width: 25px;
    height: 25px;
    // position: absolute;
    top: 3px;
    left: 3px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition:
      left 0.6s ease-in-out,
      background 0.6s ease-in-out;
  }

  &:active:after {
    width: 30px;
  }
`;

const DarkModeInput = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  visibility: hidden;

  &:checked + ${DarkModeLabel} {
    background: #242424;
  }

  &:checked + ${DarkModeLabel}:after {
    left: 62px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }
`;

const ToggleTheme: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    setIsDarkTheme(selectedTheme === Theme.DARK);
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      'data-theme',
      isDarkTheme ? Theme.DARK : Theme.LIGHT,
    );
    localStorage.setItem(
      THEME_LOCAL_STORAGE_KEY,
      isDarkTheme ? Theme.DARK : Theme.LIGHT,
    );
  }, [isDarkTheme]);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <DarkModeContainer>
      <DarkModeInput
        id='darkmode-toggle'
        onChange={handleToggleTheme}
        checked={isDarkTheme}
      />
      <DarkModeLabel htmlFor='darkmode-toggle' />
    </DarkModeContainer>
  );
};

export default ToggleTheme;
