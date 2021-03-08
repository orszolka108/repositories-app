import React, { useContext, useEffect, useState } from 'react';
import { ApiCallParameters } from '../context/ApiCallParameters';
export const TimeRangeCheckboxes = () => {
  const { since, selectSince } = useContext(ApiCallParameters);

  const handleChange = (event: any) => {
    selectSince({
      [event.target.name]: event.target.checked,
    });
  };

  const checkboxes = [
    {
      name: 'Daily',
      key: 'checkBox0',
      label: 'daily',
    },
    {
      name: 'Weekly',
      key: 'checkBox1',
      label: 'weekly',
    },
    {
      name: 'Monthly',
      key: 'checkBox2',
      label: 'monthly',
    },
  ];

  const checkIfChecked = (name: string) => {
    const checkedSince = Object.keys(since).toString();
    if (checkedSince === name) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <label>Since:</label> <br />
      {checkboxes.map((item) => (
        <label key={item.key}>
          {item.name}
          <input
            type="checkbox"
            name={item.name}
            onChange={handleChange}
            checked={checkIfChecked(item.name)}
          />
        </label>
      ))}
    </div>
  );
};
