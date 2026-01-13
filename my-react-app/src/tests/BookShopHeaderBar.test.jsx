import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookShopHeaderBar  from '../components/BookShopHeaderBar';
import { textContent } from './common/constants';


describe('BookShopHeaderBar component', () => {
  it('render header for Bookshop', () => {
    render(<BookShopHeaderBar />);
    expect(screen.getByRole('heading').textContent).toBe(textContent.headingText);
    expect(screen.getByText(/Discount on different book purchase/i)).toBeInTheDocument()
  });
});