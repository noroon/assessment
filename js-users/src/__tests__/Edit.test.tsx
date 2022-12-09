import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Edit from '../pages/Edit';

fetchMock.enableMocks();

describe('Edit Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        first_name: 'Jane',
        last_name: 'Doe',
      }),
    );
    act(() => {
      render(
        <BrowserRouter>
          <Edit />
        </BrowserRouter>,
      );
    });
  });

  describe('when the page is loaded', () => {
    const { getByRole, findByText, findByRole } = screen;
    const { change, click } = fireEvent;

    it('renders the First name field', () => {
      const firstNameField = getByRole('textbox', { name: 'First name' });
      expect(firstNameField).toBeTruthy();
    });

    it('renders the Last name field', () => {
      const lastNameField = getByRole('textbox', { name: 'Last name' });
      expect(lastNameField).toBeTruthy();
    });

    it('renders the Add button', () => {
      const submitButton = getByRole('button');
      expect(submitButton).toBeTruthy();
    });

    describe('when the submit button is clicked', () => {
      describe('when one of the fields is not edited', () => {
        it('should render a success alert', async () => {
          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

          expect(
            await findByText('The user is successfully edited'),
          ).toBeInTheDocument();
        });
      });

      describe('when one of the fields is edited', () => {
        it('should render a success alert', async () => {
          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

          act(() => {
            const firstNameField = getByRole('textbox', { name: 'First name' });

            change(firstNameField, {
              target: { value: 'Janett' },
            });
          });

          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

          expect(
            await findByText('The user is successfully edited'),
          ).toBeInTheDocument();
        });
      });

      describe('when all input fields are edited', () => {
        it('should render a success alert', async () => {
          act(() => {
            const firstNameField = getByRole('textbox', { name: 'First name' });
            const lastNameField = getByRole('textbox', { name: 'Last name' });

            change(firstNameField, {
              target: { value: 'Jane' },
            });
            change(lastNameField, {
              target: { value: 'Doe' },
            });
          });

          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

          expect(
            await findByText('The user is successfully edited'),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
