import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewCartItems  from '../components/ViewCartItems';
import { dataTestIds,textContent, currency} from '../common/constants';
import { afterEach,vi,beforeEach } from 'vitest';

let mockCart = [];
const removeFromCartMock = vi.fn();
vi.mock('../context/CardProvider', () => ({
  useCart: () => ({ cart: mockCart, removeFromCart: removeFromCartMock, }),
}));
beforeEach(() => { mockCart = []; });
afterEach(() => { cleanup(); vi.resetAllMocks(); });

describe('ViewCartItems component', () => {
  it('should render ViewCartItems component its child component and other UI elements when cart is filled', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 2 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 2 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 2 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<ViewCartItems />);
    expect(screen.getByTestId(dataTestIds.viewCartItemsPage)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.viewCartSummaryPage)).toBeInTheDocument();
    expect(screen.getByText(textContent.cartItemListHeaderTitle)).toBeInTheDocument();
    expect(screen.getAllByText(mockCart[0].title)[0].textContent).toBe('Clean Code');
    expect(screen.getAllByText(mockCart[0].price + ' ' + currency)[0].textContent).toBe('50 EUR');
    expect(screen.getAllByText(textContent.quantityText +':'+ ' ' + mockCart[0].quantity)[0].textContent).toBe('Quantity: 2');
    expect(screen.getAllByText(textContent.removeCartButtonTitle)[4].textContent).toBe(textContent.removeCartButtonTitle);
    const removeButton = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButton[0]);
    expect(removeFromCartMock).toHaveBeenCalledTimes(1);
  });
});