import React, { useContext, useEffect } from 'react';
import { ApiCallParameters } from '../context/ApiCallParameters';
export const TimeRangeCheckboxes = () => {
  const { since, selectSince } = useContext(ApiCallParameters);

  const handleChange = (event: any) => {
    selectSince({
      [event.target.name]: event.target.checked,
    });
    console.log('since1111', since);
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

  console.log('sinceceecce', since);

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
            checked={false}
          />
        </label>
      ))}
    </div>
  );
};
