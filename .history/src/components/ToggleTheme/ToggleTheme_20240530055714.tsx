import React, { useEffect } from 'react';
import styled from 'styled-components';
// import styles from './ToggleTheme.module.scss';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DarkModeContainer = styled.div`
  margin-top: 20px;
  margin-left: 1150px;
`;

const DarkModeLabel = styled.label<{ checked?: boolean }>`
  width: 65px;
  height: 30px;
  position: relative;
  display: block;
  background: ${({ checked }) => (checked ? '#242424' : '#ebebeb')};
  border-radius: 200px;
  box-shadow:
    inset 0px 5px 15px rgba(110, 108, 108, 0),
    inset 0px -5px 15px rgb(108, 99, 255);
  cursor: pointer;
  transition: 0.6s;

  &:after {
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
    top: 3px;
    left: 3px;
    background: ${({ checked }) =>
      checked
        ? 'linear-gradient(180deg, #777, #3a3a3a)'
        : 'linear-gradient(180deg, #ffcc89, #d8860b)'};
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.6s;
  }

  &:active:after {
    width: 30px;
  }
`;

const DarkModeInput = styled.input.attrs({ type: 'checkbox' })`
  width: 0;
  height: 0;
  visibility: hidden;
`;

const ToggleTheme: React.FC = () => {
  const handleDetDarkMode = () => {
    document.body.setAttribute('data-theme', Theme.DARK);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, Theme.DARK);
  };
  const handleDetLightMode = () => {
    document.body.setAttribute('data-theme', Theme.LIGHT);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, Theme.LIGHT);
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (selectedTheme === Theme.DARK) {
      handleDetDarkMode();
    } else {
      handleDetLightMode();
    }
  }, []);

  const handleToggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleDetDarkMode();
    } else {
      handleDetLightMode();
    }
  };

  const isDarkTheme =
    localStorage.getItem(THEME_LOCAL_STORAGE_KEY) === Theme.DARK;

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type='checkbox'
        id='darkmode-toggle'
        onChange={handleToggleTheme}
        defaultChecked={isDarkTheme}
      />
      <label className={styles.dark_mode_label} htmlFor='darkmode-toggle' />
    </div>
  );
};

export default ToggleTheme;
