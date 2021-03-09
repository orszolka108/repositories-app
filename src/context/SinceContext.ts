import { createContext } from 'react';
import { SinceOptions } from '../types';

export const SinceContext = createContext({
  since: {},
  selectSince: (since: SinceOptions) => {},
});
