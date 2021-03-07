import { createContext } from 'react';

export const RepositoriesTableContext = createContext({
  language: '',
  selectLanguage: (lanuage: string) => {},
  sort: 0,
  selectSort: (sort: number) => {},
});
