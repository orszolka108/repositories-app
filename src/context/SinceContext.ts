import { createContext } from 'react';

export const SinceContext = createContext({
  since: {},
  selectSince: (since: any) => {},
});
