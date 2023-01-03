import { render } from '@testing-library/react';
import App from '../App';

test('renders content', () => {
  const component = render(<App />);
  expect(component.getByText('Loading...')).toBeDefined();
});
