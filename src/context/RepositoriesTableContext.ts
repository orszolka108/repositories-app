import { createContext } from 'react';

export const RepositoriesTableContext = createContext({
  sort: 0,
  selectSort: (sort: number) => {},
});
