import React from 'react';
import { cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers';

describe('App.js elements tests', () => {
  afterEach(cleanup);

  test('renders trivia logo on header', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const logoElement = getByAltText('logo');

    expect(logoElement).toBeInTheDocument();
    expect(logoElement.className).toBe('App-logo');
  });
});

describe('App.js routes tests', () => {
  afterEach(cleanup);

  test('renders Home page on `/` path', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
