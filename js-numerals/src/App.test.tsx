import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';

import App from './App';

const { getByRole, getByText, getByTitle, getByTestId, findByText } = screen;
const { type } = user;
const { change, click } = fireEvent;

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  describe('when the page is loaded', () => {
    it('renders the input field', () => {
      const inputField = getByTitle('formInput');
      expect(inputField).toBeTruthy();
    });

    it('renders the convert button', () => {
      const submitButton = getByRole('button');
      expect(submitButton).toBeTruthy();
    });

    describe('when the convert button is clicked', () => {
      describe('when the inputfields is empty', () => {
        it('gives an alert message', () => {
          type(getByTitle('formInput'), '');
          click(getByRole('button'));

          expect(getByText('Please enter a number')).toBeTruthy();
        });
      });

      describe('when the inputfield is valid', () => {
        it('should convert 0 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '0' },
          });
          click(getByRole('button'));
          expect(await findByText('zero')).toBeInTheDocument();
        });

        it('should convert 7 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '7' },
          });
          click(getByRole('button'));
          expect(await findByText('seven')).toBeInTheDocument();
        });

        it('should convert 42 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '42' },
          });
          click(getByRole('button'));
          expect(await findByText('forty-two')).toBeInTheDocument();
        });

        it('should convert 50 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '50' },
          });
          click(getByRole('button'));
          expect(await findByText('fifty')).toBeInTheDocument();
        });

        it('should convert 100 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '100' },
          });
          click(getByRole('button'));
          expect(await findByText('one hundred')).toBeInTheDocument();
        });

        it('should convert 1999 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '1999' },
          });
          click(getByRole('button'));
          expect(
            await findByText('one thousand nine hundred and ninety-nine'),
          ).toBeInTheDocument();
        });

        it('should convert 2001 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '2001' },
          });
          click(getByRole('button'));
          expect(await findByText('two thousand and one')).toBeInTheDocument();
        });

        it('should convert 17999 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '17999' },
          });
          click(getByRole('button'));
          expect(
            await findByText('seventeen thousand nine hundred and ninety-nine'),
          ).toBeInTheDocument();
        });

        it('should convert 100001 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '100001' },
          });
          click(getByRole('button'));
          expect(
            await findByText('one hundred thousand and one'),
          ).toBeInTheDocument();
        });

        it('should convert 342251 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '342251' },
          });
          click(getByRole('button'));
          expect(
            await findByText(
              'three hundred and forty-two thousand two hundred and fifty-one',
            ),
          ).toBeInTheDocument();
        });

        it('should convert 1300420 properly', async () => {
          const formInput = getByTestId('form-input');
          change(formInput, {
            target: { value: '1300420' },
          });
          click(getByRole('button'));
          expect(
            await findByText(
              'one million three hundred thousand four hundred and twenty',
            ),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
