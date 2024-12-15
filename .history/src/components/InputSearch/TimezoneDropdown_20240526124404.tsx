import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimezoneDropdown = ({ onChange, initialTimezone = 'Europe/Moscow' }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(initialTimezone);

  const handleChange = (event) => {
    setSelectedTimezone(event.target.value);
    onChange(event.target.value);
  };

  const allTimezones = moment.tz.names();

  // Проверяем, что выбранная таймзона существует в списке доступных таймзон
  useEffect(() => {
    if (!allTimezones.includes(selectedTimezone)) {
      setSelectedTimezone(initialTimezone);
      onChange(initialTimezone);
    }
  }, [allTimezones, selectedTimezone, initialTimezone, onChange]);

  return (
    <select value={selectedTimezone} onChange={handleChange}>
      {allTimezones.map((timezone, index) => (
        <option key={index} value={timezone}>
          {timezone}
        </option>
      ))}
    </select>
  );
};

export default TimezoneDropdown;
