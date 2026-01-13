import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import ShowBookList from '../components/ShowBookList';
import { CartProvider } from '../context/CartProvider'; 
import { dataTestIds, textContent } from './common/constants';

afterEach(() => {
  cleanup();
});


describe('ShowBookList component', () => {
  it('render ShowBookList and other UI elements', () => {
    render(
      <CartProvider>
        <ShowBookList />
      </CartProvider>
    );
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    expect(screen.getByRole('heading').textContent).toBe(textContent.bookListHeaderTitle);
    const image = screen.getAllByRole('img');
    expect(image[0]).toHaveAttribute('alt','Clean Code');
    expect(image[0]).toHaveAttribute('src', expect.stringContaining('/src/assets/CleanCode.png'));
    
  });
  it('should render add to cart button', () => {
    render(
      <CartProvider>
        <ShowBookList />
      </CartProvider>
    );
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    expect(addButton[0]).toBeInTheDocument();
  });
});