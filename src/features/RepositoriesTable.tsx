import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import {
  RepositoriesListProps,
  DropdownOption,
  Repository,
} from '../types';
import { LanguageDropdown } from './LanguageDropdown';
import { SortingComponent } from './SortingComponent';
import { TimeRangeCheckboxes } from './TimeRangeCheckboxes';
import {
  displayRepositoriesList,
  filterRepositoriesByLanguage,
  sortRepositoriesByStars,
} from '../utils/helpers';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';
import { LanguageContext } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const StyledTable = styled.table`
  caption-side: top;
  border: 1px solid black;
  border-collapse: collapse;
  caption-side: bottom;
  table-layout: fixed;
  width: 600px;
  td,
  th {
    border: none;
  }
  td {
    padding: 5px 10px;
  }

  tbody tr {
    text-align: center;
  }
  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;
const CenteringWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [repositoriesArray, setRepositories] = useState<
    Repository[] | undefined
  >([]);
  const [sort, setSort] = useLocalStorage('sort', 0);

  const { language } = useContext(LanguageContext);
  const { repositories, languageOptions } = props;

  const selectSort = (sort: number) => {
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
    if (sort === 0) {
      setRepositories(repositories);
    } else {
      const sortedRepositories =
        repositoriesArray &&
        sortRepositoriesByStars(repositoriesArray, sort);
      setRepositories(sortedRepositories);
    }
  }, [sort]);

  useEffect(() => {
    if (localStorage.getItem('sort') !== null) {
      const sortedRepositories =
        repositories && sortRepositoriesByStars(repositories, sort);
      setRepositories(sortedRepositories);
    }
  }, [repositories]);
  return (
    <RepositoriesTableContext.Provider
      value={{
        sort,
        selectSort,
      }}
    >
      <div className="repositories-table">
        <CenteringWrapper>
          <TimeRangeCheckboxes />
          <LanguageDropdown dropdownOptions={options} />
          <SortingComponent />
        </CenteringWrapper>
        <StyledTable>
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
        </StyledTable>
      </div>
    </RepositoriesTableContext.Provider>
  );
};
