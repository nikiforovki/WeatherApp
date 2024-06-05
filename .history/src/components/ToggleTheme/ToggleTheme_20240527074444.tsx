import React, { useState } from 'react';

function ToggleTheme() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <label>
        <input type='checkbox' checked={isChecked} onChange={handleChange} />
        Переключить тему
      </label>
    </div>
  );
}

export default ToggleTheme;
