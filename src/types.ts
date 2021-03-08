export interface Repository {
  author: string;
  name: string;
  avatar: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
}

export interface RepositoriesListProps {
  repositories: Repository[];
  languageOptions: DropdownOption[];
}

export interface DropdownOption {
  label: string;
  value: string;
}
export interface DropdownProps {
  dropdownOptions: DropdownOption[];
}

export interface LanguagesResponse {
  name: string;
  urlParam: string;
}

export const sinceOptions = ['Daily', 'Weekly', 'Monthly'];

export interface SinceOptions {
  [keyof Array<sinceOptions>]: boolean;
}