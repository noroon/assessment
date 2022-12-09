import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });

  describe('when the page is loaded', () => {
    const { getByRole } = screen;
    const { click } = fireEvent;

    it('renders a link to home page', () => {
      const linkToHome = getByRole('link', {
        name: 'home',
      });

      expect(linkToHome).toBeTruthy();
    });

    it('renders a link to add new user page', () => {
      const linkToNewUser = getByRole('link', {
        name: 'Add new user',
      });

      expect(linkToNewUser).toBeTruthy();
    });

    describe('when the home link is clicked', () => {
      it('navigates to the home page', async () => {
        click(
          getByRole('link', {
            name: 'home',
          }),
        );

        await waitFor(() => {
          expect(window.location.pathname).toEqual('/');
        });
      });
    });

    describe('when the add new user link is clicked', () => {
      it('navigates to the add new user page', async () => {
        click(
          getByRole('link', {
            name: 'Add new user',
          }),
        );

        await waitFor(() => {
          expect(window.location.pathname).toEqual('/new');
        });
      });
    });
  });
});
