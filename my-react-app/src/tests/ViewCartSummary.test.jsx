import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import ViewCartSummary from '../components/ViewCartSummary'; 
import { dataTestIds} from './common/constants';
import { CartProvider } from '../context/CartProvider';
import BookShopHomePage from '../components/BookShopHomePage';
import { fireEvent } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('ViewCartSummary component', () => {
  const renderWithProvider = (ui) => {
    return render(
      <CartProvider>
        {ui}
      </CartProvider>
    );
  };
  it('renders ViewCartSummary with subtotal, discount and total ', () => {
    renderWithProvider(<ViewCartSummary />);
    expect(screen.getByTestId(dataTestIds.viewCartSummaryPage)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount/i)).toBeInTheDocument();
  });
  it('renders a  items with no discount', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    expect(screen.getByText(/Subtotal: 50 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 0 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount: 50 EUR/i)).toBeInTheDocument();
  });
})
