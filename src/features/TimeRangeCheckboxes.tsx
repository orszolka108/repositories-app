import React, { useContext } from 'react';
import { SinceContext } from '../context/SinceContext';
import { checkIfChecked } from '../utils/helpers';

export const TimeRangeCheckboxes = () => {
  const { since, selectSince } = useContext(SinceContext);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  return (
    <div>
      {checkboxes.map((item) => (
        <label key={item.key}>
          {item.name}
          <input
            type="checkbox"
            name={item.name}
            onChange={handleChange}
            checked={checkIfChecked(item.name, since)}
          />
        </label>
      ))}
    </div>
  );
};
