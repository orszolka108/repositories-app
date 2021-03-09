import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RepositoriesTable } from './features/RepositoriesTable';
import { SinceContext } from './context/SinceContext';
import { LanguageContext } from './context/LanguageContext';
import { formatLanguagesOptions, formatSince } from './utils/helpers';
import { DropdownOption, SinceOptions } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [since, setSince] = useLocalStorage('since', {});
  const [language, setLanguage] = useLocalStorage('language', 'All');

  const [languagesOptions, setLanguagesOptions] = useState<
    DropdownOption[]
  >([]);

  const languageAlias = language === 'All' ? '' : language;
  const url = `http://127.0.0.1:8000/repositories?language=${languageAlias}&since=${formatSince(
    since,
  )}`;

  const languagesUrl = 'http://127.0.0.1:8000/languages';

  useEffect(() => {
    axios(url).then(res => setRepositories(res.data));
  }, [url]);

  useEffect(() => {
    axios(languagesUrl).then(res => {
      const formattedOptions = formatLanguagesOptions(res.data);
      setLanguagesOptions(formattedOptions);
    });
  }, [languagesUrl]);
  const selectSince = (since: SinceOptions) => {
    setSince(since);
  };

  const selectLanguage = (language: string) => {
    setLanguage(language);
  };

  return (
    <SinceContext.Provider
      value={{
        since,
        selectSince,
      }}
    >
      <LanguageContext.Provider
        value={{
          language,
          selectLanguage,
        }}
      >
        <div className="App">
          <RepositoriesTable
            repositories={repositories}
            languageOptions={languagesOptions}
          />
        </div>
      </LanguageContext.Provider>
    </SinceContext.Provider>
  );
};

export default App;
