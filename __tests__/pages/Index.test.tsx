import { render, screen } from '@testing-library/react';
import Home from '../../app/[locale]/page';

test('繁中選項存在於Link內', () => {
  render(<Home />);

  const traditionalChineseButton = screen.getByText('繁中');
  expect(traditionalChineseButton).toBeInTheDocument();
});
