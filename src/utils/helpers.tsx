import { Repository, DropdownOption } from '../types';
import ALL_OPTIONS from '../utils/consts';

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
