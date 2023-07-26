import { render, screen } from '@testing-library/react';
import Home from '../../app/[lang]/page';

test('英文選項存在頁面上', () => {
  render(<Home />);

  const button = screen.getByText('英文');
  expect(button).toBeInTheDocument();
});
