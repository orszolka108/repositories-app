import {
  filterRepositoriesByLanguage,
  removeDuplicates,
  addAllOption,
  formatLanguagesOptions,
  getSortingIcon,
  sortRepositoriesByStars,
  setNextSort,
  checkIfChecked,
} from '../helpers';
import {
  mockedResponse,
  mockedResponseWithGoLanguage,
  mockedLanguagesResponse,
  mockedTransformedLanguagesResponse,
} from '../../mock/response';
import ALL_OPTIONS from '../consts';

let language: string | undefined = 'All';

const optionsWithDuplicates = [
  {
    label: 'Go',
    value: 'Go',
  },
  {
    label: 'Go',
    value: 'Go',
  },
  {
    label: 'Go',
    value: 'Go',
  },
  {
    label: 'JavaScript',
    value: 'JavaScript',
  },
];
const optionsWithoutDuplicates = [
  {
    label: 'Go',
    value: 'Go',
  },
  {
    label: 'JavaScript',
    value: 'JavaScript',
  },
];
const optionsWithAll = [
  {
    label: ALL_OPTIONS,
    value: ALL_OPTIONS,
  },
  ...optionsWithoutDuplicates,
];
const langOptionsWithAll = [
  {
    label: ALL_OPTIONS,
    value: ALL_OPTIONS,
  },
  ...mockedTransformedLanguagesResponse,
];
const unsortedArray = [
  {
    stars: 222,
  },
  {
    stars: 8764,
  },
  {
    stars: 66,
  },
  {
    stars: 3312,
  },
];
const sortedAsc = [
  {
    stars: 66,
  },
  {
    stars: 222,
  },
  {
    stars: 3312,
  },
  {
    stars: 8764,
  },
];
const sortedDesc = [
  {
    stars: 8764,
  },
  {
    stars: 3312,
  },
  {
    stars: 222,
  },
  {
    stars: 66,
  },
];

describe('filterRepositoriesByLanguage', () => {
  test('returns full lists of repositories', () => {
    const filteredRepositories = filterRepositoriesByLanguage(
      mockedResponse,
      language,
    );
    expect(filteredRepositories).toBe(mockedResponse);
  });
  test('filters repositories by provided language (Go)', () => {
    language = 'Go';
    const filteredRepositories = filterRepositoriesByLanguage(
      mockedResponse,
      language,
    );
    expect(filteredRepositories).toStrictEqual(
      mockedResponseWithGoLanguage,
    );
  });
  test('returns full lists of repositories if no language is provided', () => {
    language = undefined;
    const filteredRepositories = filterRepositoriesByLanguage(
      mockedResponse,
      language,
    );
    expect(filteredRepositories).toBe(mockedResponse);
  });
});

describe('removeDuplicates', () => {
  test('removes duplicates from options array', () => {
    expect(removeDuplicates(optionsWithDuplicates)).toHaveLength(2);
    expect(removeDuplicates(optionsWithDuplicates)).toStrictEqual(
      optionsWithoutDuplicates,
    );
  });
});

describe('addAllOption', () => {
  test('adds all option to the optionsArray', () => {
    expect(addAllOption(optionsWithoutDuplicates)).toStrictEqual(
      optionsWithAll,
    );
  });
});

describe('formatLanguagesOptions', () => {
  test('returns array of all options, without duplicates and with All option', () => {
    expect(
      formatLanguagesOptions(mockedLanguagesResponse),
    ).toStrictEqual(langOptionsWithAll);
  });
});

describe('getSortingIcon', () => {
  let order = 0;
  test('is returning string sort when no order is chosen', () => {
    expect(getSortingIcon(order)).toBe('Sort');
  });
  test('is returning faChevronUp icon when asc order is chosen', () => {
    order = 1;
    const result = getSortingIcon(order);
    expect(typeof result).toBe('object');
  });
  test('is returning faChevronDown sort when no order dsc chosen', () => {
    order = 2;
    const result = getSortingIcon(order);
    expect(typeof result).toBe('object');
  });
});

describe('sortRepositoriesByStars', () => {
  let order = 0;
  test('returns unsorted array ', () => {
    expect(
      sortRepositoriesByStars(unsortedArray, order),
    ).toStrictEqual(unsortedArray);
  });
  test('returns sorted ascending array ', () => {
    order = 1;
    expect(
      sortRepositoriesByStars(unsortedArray, order),
    ).toStrictEqual(sortedAsc);
  });
  test('returns sorted descending array ', () => {
    order = 2;

    expect(
      sortRepositoriesByStars(unsortedArray, order),
    ).toStrictEqual(sortedDesc);
  });
});

describe('setNextSort', () => {
  let order = 0;
  test('sets asc after sort option', () => {
    expect(setNextSort(order)).toStrictEqual(order + 1);
  });
  test('sets dsc after asc option ', () => {
    order = 1;
    expect(setNextSort(order)).toStrictEqual(order + 1);
  });
  test('sets sort after dsc option', () => {
    order = 2;
    expect(setNextSort(order)).toStrictEqual(0);
  });
});

describe('checkIfChecked', () => {
  let name = 'Daily';
  const sinceObj = {
    Weekly: false,
  };
  test('returns false when name is not matching', () => {
    expect(checkIfChecked(name, sinceObj)).toBeFalsy();
  });
  test('returns true when name is matching', () => {
    name = 'Weekly';
    expect(checkIfChecked(name, sinceObj)).toBeTruthy();
  });
});
