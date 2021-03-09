import React, { useContext } from 'react';
import { DropdownProps, DropdownOption } from '../types';
import { LanguageContext } from '../context/LanguageContext';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';

export const LanguageDropdown = (props: DropdownProps) => {
  const { dropdownOptions } = props;

  const { language, selectLanguage } = useContext(LanguageContext);
  const { selectSort } = useContext(RepositoriesTableContext);

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    selectLanguage(event.target.value);
    selectSort(0);
  };

  return (
    <select
      data-testid="language-select"
      onChange={handleSelect}
      value={language}
    >
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
