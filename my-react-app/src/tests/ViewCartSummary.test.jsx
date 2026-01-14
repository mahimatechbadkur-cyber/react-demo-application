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
  it('renders a items with no discount', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    expect(screen.getByText(/Subtotal: 50 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 0 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount: 50 EUR/i)).toBeInTheDocument();
  });
  it('calculates 25% discount for 5 different books (single quantities)', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[1]);
    fireEvent.click(addButton[2]);
    fireEvent.click(addButton[3]);
    fireEvent.click(addButton[4]);
    expect(screen.getByText(/Subtotal: 250 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 62.5 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount: 187.5 EUR/i)).toBeInTheDocument();
  });

  it('calculates 20% discount for 4 different books', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[1]);
    fireEvent.click(addButton[2]);
    fireEvent.click(addButton[3]);
    expect(screen.getByText(/Subtotal: 200 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 40 EUR/i)).toBeInTheDocument();
  });

  it('calculates 10% discount for 3 different books', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[1]);
    fireEvent.click(addButton[2]);
    expect(screen.getByText(/Subtotal: 150 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 15 EUR/i)).toBeInTheDocument();
  });

  it('calculates 5% discount for 2 different books', () => {
    renderWithProvider(<BookShopHomePage />);
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[1]);
    expect(screen.getByText(/Subtotal: 100 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Price: 5 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount: 95 EUR/i)).toBeInTheDocument();
  });

})
