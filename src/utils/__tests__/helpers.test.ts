import {
  filterRepositoriesByLanguage,
  removeDuplicates,
  addAllOption,
  getLanguagesOptions,
} from '../helpers';
import {
  mockedResponse,
  mockedResponseWithGoLanguage,
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

describe('getLanguagesOptions', () => {
  test('returns array of all options, without duplicates and with All option', () => {
    expect(getLanguagesOptions(mockedResponse)).toStrictEqual(
      optionsWithAll,
    );
  });
});
