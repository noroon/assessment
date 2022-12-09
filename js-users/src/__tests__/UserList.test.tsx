import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import UserList from '../components/UserList';
import { userList } from '../utils/userList';

fetchMock.enableMocks();

describe('UserList Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(userList));
    act(() => {
      render(
        <BrowserRouter>
          <UserList />
        </BrowserRouter>,
      );
    });
  });

  describe('when the page is loaded', () => {
    const { findByText, getByTestId } = screen;

    it('gets a list of users', async () => {
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    });

    it('renders a list', async () => {
      expect(getByTestId('list-element')).toBeTruthy();

      expect(await findByText('Jane Doe')).toBeInTheDocument();

      expect(await findByText('John Doe')).toBeInTheDocument();

      expect(await findByText('John Smith')).toBeInTheDocument();
    });
  });
});
