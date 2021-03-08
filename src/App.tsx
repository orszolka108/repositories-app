import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RepositoriesTable } from './features/RepositoriesTable';
import { ApiCallParameters } from './context/ApiCallParameters';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [since, setSince] = useState({});

  const url = 'http://127.0.0.1:8000/repositories';
  useEffect(() => {
    axios(url).then(res => setRepositories(res.data));
  }, []);

  const selectSince = (since: any) => {
    setSince(since);
  };

  console.log('since', since);
  return (
    <ApiCallParameters.Provider
      value={{
        since,
        selectSince,
      }}
    >
      <div className="App">
        <RepositoriesTable repositories={repositories} />
      </div>
    </ApiCallParameters.Provider>
  );
};

export default App;
