import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/You just setup react with babel and eslint/i);
  expect(linkElement).toBeInTheDocument();
});
