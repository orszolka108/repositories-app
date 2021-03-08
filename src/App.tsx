import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import { RepositoriesTable } from './features/RepositoriesTable';
import { SinceContext } from './context/SinceContext';
import { LanguageContext } from './context/LanguageContext';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [since, setSince] = useState({});

  const { language, selectLanguage } = useContext(LanguageContext);

  const url = `http://127.0.0.1:8000/repositories?language=${language}&since=${Object.keys(
    since,
  ).toString()}`;

  useEffect(() => {
    axios(url).then(res => setRepositories(res.data));
  }, [since, language]);

  const selectSince = (since: any) => {
    setSince(since);
  };

  console.log('language', language);
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
          <RepositoriesTable repositories={repositories} />
        </div>
      </LanguageContext.Provider>
    </SinceContext.Provider>
  );
};

export default App;
