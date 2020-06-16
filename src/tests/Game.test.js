import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Game } from '../pages';
import renderWithRouter from './helpers';
import App from '../App';

describe('Game.jsx tests', () => {
  afterEach(cleanup);

  test('renders Game page on `/game` path', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/game');
    const { pathname } = history.location;

    expect(pathname).toBe('/game');
  });

  test('renders header obrigatory elements', () => {
    const { getByTestId } = render(<Game />);
    const userAvatar = getByTestId('header-profile-picture');
    const userName = getByTestId('header-player-name');
    const userScore = getByTestId('header-score');

    expect(userAvatar).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userScore).toBeInTheDocument();
  });
});
