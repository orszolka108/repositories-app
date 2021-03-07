import React, { useState, useEffect } from 'react';
import { RepositoriesListProps, DropdownOption } from '../types';
import { LanguageDropdown } from './LanguageDropdown';
import {
  getLanguagesOptions,
  displayRepositoriesList,
  filterRepositoriesByLanguage,
} from '../utils/helpers';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [language, setLanguage] = useState('All');
  const [repositoriesArray, setRepositories] = useState<any[]>([]);

  const { repositories } = props;

  useEffect(() => {
    setRepositories(repositories);
    return () => {};
  }, [repositories]);

  useEffect(() => {
    const languagesOptions = getLanguagesOptions(repositories);
    setOptions(languagesOptions);
    return () => {};
  }, [repositories]);

  useEffect(() => {
    const filteredRepositories = filterRepositoriesByLanguage(
      repositories,
      language,
    );
    setRepositories(filteredRepositories);
  }, [language]);

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
          <tbody>
            {repositoriesArray &&
              displayRepositoriesList(repositoriesArray)}
          </tbody>
        </table>
      </div>
    </RepositoriesTableContext.Provider>
  );
};
