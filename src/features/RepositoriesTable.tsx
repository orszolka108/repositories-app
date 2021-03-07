import React, { useState, useEffect, useRef } from 'react';
import {
  RepositoriesListProps,
  DropdownOption,
  Repository,
} from '../types';
import { LanguageDropdown } from './LanguageDropdown';
import { SortingComponent } from './SortingComponent';
import { TimeRangeCheckboxes } from './TimeRangeCheckboxes';
import {
  getLanguagesOptions,
  displayRepositoriesList,
  filterRepositoriesByLanguage,
  sortRepositoriesByStars,
} from '../utils/helpers';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [language, setLanguage] = useState('All');
  const [repositoriesArray, setRepositories] = useState<
    Repository[] | undefined
  >([]);
  const [sort, setSort] = useState<any>(2);
  const initialRender = useRef(true);

  const { repositories } = props;

  const selectSort = (sort: number) => {
    setSort(sort);
  };

  const selectLanguage = (language: string) => {
    setLanguage(language);
  };
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

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const sortedRepositories = sortRepositoriesByStars(
        repositoriesArray,
        sort,
      );
      setRepositories(sortedRepositories);
    }
  }, [sort]);

  return (
    <RepositoriesTableContext.Provider
      value={{
        language,
        selectLanguage,
        sort,
        selectSort,
      }}
    >
      <div className="repositories-table">
        <TimeRangeCheckboxes />
        <LanguageDropdown dropdownOptions={options} />
        <SortingComponent />
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
