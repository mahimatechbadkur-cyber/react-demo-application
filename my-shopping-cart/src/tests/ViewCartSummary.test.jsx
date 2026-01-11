import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewCartSummary  from '../components/ViewCartSummary';
import { dataTestIds,textContent} from '../common/constants';
import { afterEach,vi,beforeEach } from 'vitest';

let mockCart = [];
vi.mock('../context/CardProvider', () => ({
  useCart: () => ({ cart: mockCart,
  }),
}));
beforeEach(() => { mockCart = []; });
afterEach(() => { cleanup(); vi.resetAllMocks(); });

describe('ViewCartSummary component', () => {
  it('should render ViewCartSummary component and other UI elements when cart is filled', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 2 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 2 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 2 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<ViewCartSummary />);
    expect(screen.getByTestId(dataTestIds.viewCartSummaryPage)).toBeInTheDocument();
    expect(screen.getByText(textContent.orderSummaryText)).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Subtotal: 400 EUR', 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp('Discounted Price: 80 EUR','i'))).toBeInTheDocument();
    expect(screen.getByText( new RegExp('Total Amount: 320 EUR','i'))).toBeInTheDocument();
  });
  it('renders a single item and correct totals with no discount', () => {
    mockCart = [{ id: 1, title: 'Book A', price: 50, quantity: 1 }];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 50 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 0 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 50 EUR', 'i'))).toBeInTheDocument();
  });

  it('test to check when cart is filled with 5 different books with multiple quantities', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 2 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 2 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 2 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 400 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 80 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 320 EUR', 'i'))).toBeInTheDocument();
  });
  it('test to check when cart is filled with 5 different books with single quantities', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 1 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 250 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 62.5 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 187.5 EUR', 'i'))).toBeInTheDocument();
  });
  it('test to check when cart is filled with 4 different books with single quantities', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 1 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
    ];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 200 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 40 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 160 EUR', 'i'))).toBeInTheDocument();
  });
  it('test to check when cart is filled with 3 different books with single quantities', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 1 }
    ];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 150 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 15 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 135 EUR', 'i'))).toBeInTheDocument();
  });
  it('test to check when cart is filled with 2 different books with single quantities', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
    ];
    render(<ViewCartSummary />);
    expect(screen.getByText(new RegExp('Subtotal: 100 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Discounted Price: 5 EUR', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Total Amount: 95 EUR', 'i'))).toBeInTheDocument();
  });
});