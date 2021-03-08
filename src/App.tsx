import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import { RepositoriesTable } from './features/RepositoriesTable';
import { SinceContext } from './context/SinceContext';
import { LanguageContext } from './context/LanguageContext';
import { formatLanguagesOptions } from './utils/helpers';
import { DropdownOption } from './types';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [since, setSince] = useState({});
  const [language, setLanguage] = useState('All');
  const [languagesOptions, setLanguagesOptions] = useState<
    DropdownOption[]
  >([]);

  const languageAlias = language === 'All' ? '' : language;
  const formattedSince = Object.keys(since).toString();
  const url = `http://127.0.0.1:8000/repositories?language=${languageAlias}&since=${formattedSince}`;
  const languagesUrl = 'http://127.0.0.1:8000/languages';
  useEffect(() => {
    axios(url).then(res => setRepositories(res.data));
  }, [since, language]);

  useEffect(() => {
    axios(languagesUrl).then(res => {
      const formattedOptions = formatLanguagesOptions(res.data);
      setLanguagesOptions(formattedOptions);
    });
  }, []);
  const selectSince = (since: any) => {
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
