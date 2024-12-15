import React, { useState } from 'react';
import moment from 'moment-timezone';

const TimezoneDropdown = ({ onChange }) => {
  const allTimezones = moment.tz.names();

  const handleChange = (event) => {
    setSelectedTimezone(event.target.value);
    onChange(event.target.value);
  };

  const allTimezones = moment.tz.names();

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
