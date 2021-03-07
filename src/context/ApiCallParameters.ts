import { createContext } from 'react';

export const ApiCallParameters = createContext({
  since: {},
  selectSince: (since: any) => {},
});
