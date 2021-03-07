import React, { useContext } from 'react';
import { RepositoriesTableContext } from '../context/RepositoriesTableContext';
import { getSortingIcon, setNextSort } from '../utils/helpers';

export const SortingComponent = () => {
  const { sort, selectSort } = useContext(RepositoriesTableContext);

  const handleClick = () => {
    console.log('naClicku', sort);
    const nextSort = setNextSort(sort);
    selectSort(nextSort as number);
  };

  return (
    <>
      <button onClick={handleClick}>{getSortingIcon(sort)}</button>{' '}
    </>
  );
};
