import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Matching Kitties Game header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Matching Kitties Game/i);
  expect(headerElement).toBeInTheDocument();
});
