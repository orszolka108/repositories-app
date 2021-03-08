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
