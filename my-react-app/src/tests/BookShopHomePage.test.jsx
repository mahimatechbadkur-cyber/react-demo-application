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
  it('item should get added to cart on add button click', () => {
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
  });
});
