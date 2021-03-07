import React from 'react';
import { Repository } from '../types';

export const getLanguagesOptions = (repositories: Repository[]) => {
  const languagesOptions = repositories.map(
    (repository: Repository) => {
      return {
        label: repository.language,
        value: repository.language,
      };
    },
  );
  return languagesOptions;
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
