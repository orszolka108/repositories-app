import React from 'react';
import './App.css';
import { mockedResponse } from './mock/response.js';
import { RepositoriesTable } from './features/RepositoriesTable';

function App() {
  return (
    <div className="App">
      <RepositoriesTable repositories={mockedResponse} />
    </div>
  );
}

export default App;
