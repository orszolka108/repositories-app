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

export interface SinceOptions {
  Weekly?: boolean;
  Daily?: boolean;
  Monthly?: boolean;
}
export interface SortingTypes {
  [key: number]: SortingObject;
}

export interface SortingObject {
  class: string;
  fn: (a: Repository, b: Repository) => number;
}
