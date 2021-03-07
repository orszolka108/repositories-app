import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RepositoriesTable } from './features/RepositoriesTable';

const App = () => {
  const [repositories, setRepositories] = useState([]);

  const url = 'http://127.0.0.1:8000/repositories';
  useEffect(() => {
    axios(url).then(res => setRepositories(res.data));
  }, []);

  return (
    <div className="App">
      <RepositoriesTable repositories={repositories} />
    </div>
  );
};

export default App;
