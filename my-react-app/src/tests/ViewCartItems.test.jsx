import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { dataTestIds, textContent, currency } from './common/constants';
import ViewCartItems from '../components/ViewCartItems';
import { CartProvider } from '../context/CartProvider';
import BookShopHomePage from '../components/BookShopHomePage';

describe('ViewCartItems component', () => {
  const renderWithProvider = (ui) => {
    return render(
      <CartProvider>
        {ui}
      </CartProvider>
    );
  };
  it('renders ViewCartItemswhen the cart is initially empty', () => {
    renderWithProvider(<ViewCartItems />);
    const container = screen.getByTestId(dataTestIds.viewCartItemsPage);
    expect(container).toBeInTheDocument();
    expect(screen.getByText(textContent.cartItemListHeaderTitle)).toBeInTheDocument();
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
  it('renders cart items when items are present', async () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[0]); 
    const container = screen.getByTestId(dataTestIds.viewCartItemsPage);
    expect(container).toBeInTheDocument();
    expect(screen.getByText(textContent.cartItemListHeaderTitle)).toBeInTheDocument();
    expect(screen.getAllByText('Clean Code')[0]).toBeInTheDocument();
    expect(screen.getAllByText(`50 ${currency}`)[0]).toBeInTheDocument();
    expect(screen.getAllByText(`${textContent.quantityText}: 2`)[0]).toBeInTheDocument();
  });

});