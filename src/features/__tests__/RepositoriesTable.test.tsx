import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { RepositoriesTable } from '../RepositoriesTable';
import { mockedResponse } from '../../mock/response.js';

afterEach(cleanup);

const names = mockedResponse.map((repository) => {
  return repository.name;
});
const columns = ['Name', 'Stars', 'Language'];

test('renders table with three columns', () => {
  const names = mockedResponse.map((repository) => {
    return repository.name;
  });
  const columns = ['Name', 'Stars', 'Language'];
  const { getByText } = render(
    <RepositoriesTable repositories={mockedResponse} />,
  );
  expect(getByText(columns[0])).toBeInTheDocument();
  expect(getByText(columns[1])).toBeInTheDocument();
  expect(getByText(columns[2])).toBeInTheDocument();
});

test('renders table with four rows with records', () => {
  const { getAllByTestId } = render(
    <RepositoriesTable repositories={mockedResponse} />,
  );
  expect(getAllByTestId(/repository-row/i)).toHaveLength(4);
});

test('renders dropdown with language options', () => {
  const { getByTestId } = render(
    <RepositoriesTable repositories={mockedResponse} />,
  );
  expect(getByTestId(/language-select/i)).toBeInTheDocument();
});
