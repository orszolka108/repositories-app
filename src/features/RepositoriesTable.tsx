import React, { useState, useEffect } from 'react';
import { RepositoriesListProps, DropdownOption } from '../types';
import { LanguageDropdown } from './LanguageDropdown';
import {
  getLanguagesOptions,
  displayRepositoriesList,
} from '../utils/helpers';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [language, setLanguage] = useState('');

  const { repositories } = props;

  useEffect(() => {
    const languagesOptions = getLanguagesOptions(repositories);
    setOptions(languagesOptions);
    return () => {};
  }, [repositories]);

  const selectLanguage = (language: string) => {
    setLanguage(language);
  };
  return (
    <RepositoriesTableContext.Provider
      value={{ language, selectLanguage }}
    >
      <div className="repositories-table">
        <LanguageDropdown dropdownOptions={options} />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stars</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>{displayRepositoriesList(repositories)}</tbody>
        </table>
      </div>
    </RepositoriesTableContext.Provider>
  );
};
