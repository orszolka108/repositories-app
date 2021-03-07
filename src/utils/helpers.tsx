import { Repository, DropdownOption } from '../types';
import ALL_OPTIONS from '../utils/consts';

// RepositoriesTable fn

export const filterRepositoriesByLanguage = (
  repositories: Repository[],
  language: string | undefined,
): any => {
  if (language === ALL_OPTIONS || language === undefined) {
    return repositories;
  }
  return repositories.filter((item) =>
    language.includes(item.language),
  );
};
export const removeDuplicates = (options: DropdownOption[]) =>
  options.reduce((unique: DropdownOption[], o: DropdownOption) => {
    if (
      !unique.some(
        (obj: any) => obj.label === o.label && obj.value === o.value,
      )
    ) {
      unique.push(o);
    }
    return unique;
  }, []);

export const addAllOption = (options: DropdownOption[]) => {
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

// RepositoriesTable component test covers this fn
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

// SortingComponent fn

export const getSortingIcon = (order: number) => {
  switch (order) {
    case 0:
      return 'Asc';
    case 1:
      return 'Desc';
    case 2:
      return 'Sort';
  }
};
const sortTypes: any = {
  0: {
    class: 'sort-up',
    fn: (a: Repository, b: Repository) => a.stars - b.stars,
  },
  1: {
    class: 'sort-down',
    fn: (a: Repository, b: Repository) => b.stars - a.stars,
  },
  2: {
    class: 'sort-down',
    fn: (a: Repository, b: Repository) => a,
  },
};

export const sortRepositoriesByStars = (
  repositories: any,
  sort: number,
) => {
  return repositories.sort(sortTypes[sort].fn);
};

export const setNextSort = (sort: number) => {
  let nextSort;
  if (sort === 0) nextSort = 1;
  else if (sort === 1) nextSort = 2;
  else if (sort === 2) nextSort = 0;

  return nextSort;
};
