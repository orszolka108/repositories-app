import React from 'react';
import { Repository, DropdownOption } from '../types';
import ALL_OPTIONS from '../utils/consts';

// TODO add tests covering helpers fn

export const filterRepositoriesByLanguage = (
  repositories: Repository[],
  language: string,
): any => {
  if (language === 'All') {
    return repositories;
  }
  return repositories.filter((item) =>
    language.includes(item.language),
  );
};

const removeDuplicates = (options: any[]) => {
  return options.reduce((unique, o) => {
    if (
      !unique.some(
        (obj: any) => obj.label === o.label && obj.value === o.value,
      )
    ) {
      unique.push(o);
    }
    return unique;
  }, []);
};

const addAllOption = (options: DropdownOption[]) => {
  return [
    {
      label: ALL_OPTIONS,
      value: ALL_OPTIONS,
    },
    ...options,
  ];
};

export const getLanguagesOptions = (repositories: Repository[]) => {
  const languagesOptions = repositories.map(
    (repository: Repository) => {
      return {
        label: repository.language,
        value: repository.language,
      };
    },
  );
  const languagesOptionsUnique = removeDuplicates(languagesOptions);
  const languagesWithAllOption = addAllOption(languagesOptionsUnique);
  return languagesWithAllOption;
};

export const displayRepositoriesList = (repositories: Repository[]) =>
  repositories.map((repository: Repository, index: number) => {
    return (
      <tr data-testid="repository-row" key={`repository-${index}`}>
        <td>{repository.name}</td>
        <td>{repository.stars}</td>
        <td>{repository.language}</td>
      </tr>
    );
  });
