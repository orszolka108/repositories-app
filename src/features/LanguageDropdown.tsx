import React, { useState } from 'react';
import { DropdownProps, DropdownOption } from '../types';

export const LanguageDropdown = (props: DropdownProps) => {
  const { dropdownOptions } = props;

  const [language, setLanguage] = useState('');

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLanguage(event.target.value);
  };
  return (
    <select data-testid="language-select" onChange={handleSelect}>
      {dropdownOptions &&
        dropdownOptions.map(
          (option: DropdownOption, index: number) => {
            return (
              <>
                <option key={`option-${index}`} value={option.value}>
                  {option.label}
                </option>
              </>
            );
          },
        )}
    </select>
  );
};
