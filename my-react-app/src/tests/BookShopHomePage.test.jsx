import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookShopHomePage from '../components/BookShopHomePage';
import { dataTestIds } from './common/constants';
import { CartProvider } from '../context/CartProvider';

describe('BookShopHomePage component', () => {
  it('renders BookshopHomePage', () => {
    render(
      <CartProvider>
        <BookShopHomePage />
      </CartProvider>
    );

    expect(screen.getByTestId(dataTestIds.bookShopHomePage)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.viewCartItemsPage)).toBeInTheDocument();
  });
  it('item should get added to cart on add button click',() => {
    render(
      <CartProvider>
        <BookShopHomePage />
      </CartProvider>
    );

    expect(screen.getByTestId(dataTestIds.bookShopHomePage)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.viewCartItemsPage)).toBeInTheDocument();
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    expect(addButton[0]).toBeInTheDocument();
    fireEvent.click(addButton[0]);
    expect(screen.getAllByText('Clean Code')[0]).toBeInTheDocument();
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    if (removeButtons.length > 0) {
      fireEvent.click(removeButtons[0]);
    }
  });
  it('item quantity should get decreased on decrease button click',  async() => {
    render(
      <CartProvider>
        <BookShopHomePage />
      </CartProvider>
    )
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    expect(addButton[0]).toBeInTheDocument();
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[0]);
    expect(screen.getAllByText('Clean Code')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Quantity: 2')[0]).toBeInTheDocument();
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByText('Quantity: 1')[0]).toBeInTheDocument(); 
  });
});
