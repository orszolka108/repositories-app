import { createContext } from 'react';

export const LanguageContext = createContext({
  language: '',
  selectLanguage: (lanuage: string) => {},
});
