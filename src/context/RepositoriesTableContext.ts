import { createContext } from 'react';

export const RepositoriesTableContext = createContext({
  language: '',
  selectLanguage: (lanuage: string) => {},
});
