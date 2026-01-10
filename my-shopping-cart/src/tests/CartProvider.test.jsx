
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CardProvider';
import App from '../App'
import { dataTestIds} from '../common/constants';
import { describe, it, expect } from 'vitest';

describe('CartProvider test', () => {
  it('should render EmptyCartView Component when cart is empty', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    expect(screen.getByTestId(dataTestIds.emptyCartView)).toBeInTheDocument();
  });
  it('Should increase the cart item count by 1 on add button click', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    expect(screen.getByText(/Quantity: 1/i)).toBeInTheDocument();
  });
  it('Should drcrease the cart item count by 1 on remove button click', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[0]);
    expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
    const removeButton = screen.getAllByRole('button', { name: /removeIcon/i });
    fireEvent.click(removeButton[0]);
    expect(screen.getByText(/Quantity: 1/i)).toBeInTheDocument();
  });
  it('should increases the quantity by 1 when a book is already added', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[0]);
    expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
  });
    
  it('adds multiple different title Books', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
    const addButton = screen.getAllByRole('button', { name: /addIcon/i });
    fireEvent.click(addButton[0]);
    fireEvent.click(addButton[1]);
    fireEvent.click(addButton[2]);
    expect(screen.getAllByText(/Quantity: 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Quantity: 1/i)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/Quantity: 1/i)[2]).toBeInTheDocument();
  });

});
