import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DarkModeContainer = styled.div`s
  // top: 38px;
`;

const DarkModeLabel = styled.label`
  width: 65px;
  height: 30px;
  // top: 20px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow:
    inset 0px 5px 15px rgba(110, 108, 108, 0),
    inset 0px -5px 15px rgb(108, 99, 255);
  cursor: pointer;
  transition: background 0.6s ease-in-out;
  right: 20px;

  &:after {
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
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

  @media (min-width: 320px) and (max-width: 374px) {
    // top: 10px;
    right: 51px;
    // left: 10px;
  }
  @media (min-width: 375px) and (max-width: 768px) {
    right: 40px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    top: 40px;
    // right: 71px;
    // left: 10px;
  }

  @media (min-width: 1025px) and (max-width: 1294px) {
    // top: 40px;
    right: 71px;
    // left: 10px;
  }

  @media (min-width: 1295px) and (max-width: 1366px) {
    right: 20px;
  }

  @media (min-width: 1367px) {
    right: 20px;
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
    left: calc(100% - 28px);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }
`;

export const ToggleTheme: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setIsDarkTheme(prefersDark);
    }
  }, []);

  useEffect(() => {
    const themeKey = isDarkTheme ? 'dark' : 'light';
    localStorage.setItem('theme', themeKey);
    document.documentElement.dataset.theme = themeKey;
    console.log(`Setting theme to: ${themeKey}`);
  }, [isDarkTheme]);

  useEffect(() => {
    const themeListener = (e: MediaQueryListEvent) => {
      const prefersDark = e.matches;
      console.log(
        `Current theme after system change: ${prefersDark ? 'dark' : 'light'}`,
      );
      setIsDarkTheme(prefersDark);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', themeListener);

    return () => {
      mediaQuery.removeEventListener('change', themeListener);
    };
  }, []);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log(`Toggled theme: ${isDarkTheme ? 'dark' : 'light'}`);
  };

  return (
    <DarkModeContainer>
      <DarkModeInput
        id='darkmode-toggle'
        type='checkbox'
        onChange={handleToggleTheme}
        checked={isDarkTheme}
      />
      <DarkModeLabel htmlFor='darkmode-toggle' />
    </DarkModeContainer>
  );
};

export default ToggleTheme;
