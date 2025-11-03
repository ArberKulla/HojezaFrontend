import { expect, test } from 'vitest';
import App from '@/App';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

test('render <App />', () => {
  const { getByText } = render(<App />);
  const title = getByText('create-boilerplate-vite-react-ts');

  expect(title).toBeInTheDocument();
});
