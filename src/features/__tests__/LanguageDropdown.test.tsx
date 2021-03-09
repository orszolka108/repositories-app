import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LanguageDropdown } from '../LanguageDropdown';
import { LanguageContext } from '../../context/LanguageContext';
import { langOptionsWithAll } from '../../mock/response';

describe('<LanguageDropdown />', () => {
  describe('when language is set to All', () => {
    const providerProps = {
      value: 'All',
      selectLanguage: jest.fn(),
    };
    const customRender = (
      ui: any,
      { providerProps, ...renderOptions }: any,
    ) => {
      return render(
        <LanguageContext.Provider {...providerProps}>
          {ui}
        </LanguageContext.Provider>,
        renderOptions,
      );
    };

    describe('when clicking select', () => {
      it('language callback is ran', () => {
        customRender(
          <LanguageDropdown dropdownOptions={langOptionsWithAll} />,
          { providerProps },
        );
        userEvent.click(screen.getByTestId(/language-select/i));
      });
    });
  });
});
