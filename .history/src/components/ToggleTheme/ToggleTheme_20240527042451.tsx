import React, { useEffect } from 'react';
import styles from './ToggleTheme.module.scss';
import { THEME_LOCAL_STORAGE_KEY } from './constants';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const ToggleTheme: React.FC = () => {
  const handleToggleTheme = () => {
    const newTheme = document.body.className.includes('dark')
      ? Theme.LIGHT
      : Theme.DARK;
    document.body.className = `${newTheme}`;
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    if (selectedTheme === Theme.DARK) {
      document.body.className = `${Theme.DARK} ${styles.dark_mode}`;
    } else {
      document.body.className = `${Theme.LIGHT} ${styles.light_mode}`;
    }
  }, []);

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type='checkbox'
        id='darkmode-toggle'
        onChange={handleToggleTheme}
        defaultChecked={
          localStorage.getItem(THEME_LOCAL_STORAGE_KEY) === Theme.DARK
        }
      />
      <label className={styles.dark_mode_label} htmlFor='darkmode-toggle' />
    </div>
  );
};

export default ToggleTheme;
