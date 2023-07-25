import { render, screen } from '@testing-library/react';
import Home from '../../app/[locale]/page';

test('英文選項存在於Link內', () => {
  render(<Home />);

  const traditionalChineseButton = screen.getByText('英文');
  expect(traditionalChineseButton).toBeInTheDocument();
});
