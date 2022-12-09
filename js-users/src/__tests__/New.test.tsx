import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import New from '../pages/New';

fetchMock.enableMocks();

describe('New Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    render(
      <BrowserRouter>
        <New />
      </BrowserRouter>,
    );
  });

  describe('when the page is loaded', () => {
    const { getByRole, findByText } = screen;
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
      describe('when some of the fields are empty', () => {
        it('gives an alert message, when first name is missing', async () => {
          fetchMock.mockResponseOnce(
            JSON.stringify({
              last_name: ["can't be blank"],
            }),
            { status: 422, headers: { 'content-type': 'application/json' } },
          );

          act(() => {
            const firstNameField = getByRole('textbox', { name: 'First name' });

            change(firstNameField, {
              target: { value: 'Jane' },
            });
          });

          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

          expect(
            await findByText("Last name can't be blank"),
          ).toBeInTheDocument();
        });

        it('gives an alert message, when last name is missing', async () => {
          fetchMock.mockResponseOnce(
            JSON.stringify({
              first_name: ["can't be blank"],
            }),
            { status: 422, headers: { 'content-type': 'application/json' } },
          );

          act(() => {
            const lastNameField = getByRole('textbox', { name: 'Last name' });

            change(lastNameField, {
              target: { value: 'Doe' },
            });
          });

          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

          expect(
            await findByText("First name can't be blank"),
          ).toBeInTheDocument();
        });
      });

      describe('when all inputfields are valid', () => {
        beforeEach(() => {
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
        });

        it('should render a success alert', async () => {
          fetchMock.mockResponseOnce(JSON.stringify({}));
          click(getByRole('button'));

          await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

          expect(
            await findByText('The user is successfully added'),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
