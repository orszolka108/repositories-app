import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
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
import { LanguageContext } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [repositoriesArray, setRepositories] = useState<
    Repository[] | undefined
  >([]);
  const [sort, setSort] = useLocalStorage('sort', 2);

  const { language } = useContext(LanguageContext);
  const initialRender = useRef(true);
  const { repositories, languageOptions } = props;

  const selectSort = (sort: any) => {
    setSort(sort);
  };

  useEffect(() => {
    setRepositories(repositories);
    return () => {};
  }, [repositories]);

  useEffect(() => {
    setOptions(languageOptions);
    return () => {};
  }, [languageOptions]);

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
      const sortedRepositories =
        repositoriesArray &&
        sortRepositoriesByStars(repositoriesArray, sort);
      setRepositories(sortedRepositories);
    }
  }, [sort]);

  return (
    <RepositoriesTableContext.Provider
      value={{
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
