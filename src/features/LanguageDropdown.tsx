import React, { useContext } from 'react';
import { DropdownProps, DropdownOption } from '../types';
import { LanguageContext } from '../context/LanguageContext';

export const LanguageDropdown = (props: DropdownProps) => {
  const { dropdownOptions } = props;

  const { language, selectLanguage } = useContext(LanguageContext);

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    selectLanguage(event.target.value);
  };

  return (
    <select data-testid="language-select" onChange={handleSelect}>
      {dropdownOptions &&
        dropdownOptions.map(
          (option: DropdownOption, index: number) => {
            return (
              <option key={`option-${index}`} value={option.value}>
                {option.label}
              </option>
            );
          },
        )}
    </select>
  );
};
