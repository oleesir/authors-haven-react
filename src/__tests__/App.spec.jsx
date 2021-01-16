import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(
    /The one-stop shop for all the self-help ideas you need/i
  );
  expect(linkElement).toBeInTheDocument();
});
