import React from 'react';
import styles from './ToggleTheme.module.scss';

const ToggleTheme = ({ theme, toggleTheme }) => {
  const isDarkTheme = theme === 'dark';

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type='checkbox'
        id='darkmode-toggle'
        checked={isDarkTheme}
        onChange={toggleTheme}
      />
      <label className={styles.dark_mode_label} htmlFor='darkmode-toggle' />
    </div>
  );
};

export default ToggleTheme;
