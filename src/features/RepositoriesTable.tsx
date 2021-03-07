import React, { useState, useEffect } from 'react';
import { RepositoriesListProps, DropdownOption } from '../types';
import { LanguageDropdown } from './LanguageDropdown';
import {
  getLanguagesOptions,
  displayRepositoriesList,
} from '../utils/helpers';

export const RepositoriesTable = (props: RepositoriesListProps) => {
  const [options, setOptions] = useState<DropdownOption[]>([]);

  const { repositories } = props;

  useEffect(() => {
    const languagesOptions = getLanguagesOptions(repositories);
    setOptions(languagesOptions);
    return () => {};
  }, []);

  return (
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
  );
};
