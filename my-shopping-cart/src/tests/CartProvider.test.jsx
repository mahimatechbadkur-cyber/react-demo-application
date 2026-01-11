import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CardProvider';
import { expect, describe, it, vi } from 'vitest'; 


const CartTester = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, totalItems } = useCart();
  
  return (
    <div>
      <p data-testid="total-count">{totalItems}</p>
      <p data-testid="unique-count">{cart.length}</p>
      
      <button onClick={() => addToCart({ id: 1, name: 'Product A' })}>Add A</button>
      <button onClick={() => decreaseQuantity(1)}>Decrease A</button>
      <button onClick={() => removeFromCart(1)}>Remove A</button>
      <button onClick={() => clearCart()}>Clear All</button>

      <ul>
        {cart.map(item => (
          <li key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('CartProvider Logic', () => {
  it('should handle all cart operations correctly', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTester />
      </CartProvider>
    );

    
    expect(screen.getByTestId('total-count')).toHaveTextContent('0');

    
    await user.click(screen.getByText('Add A'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('1');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Qty: 1');

    
    await user.click(screen.getByText('Add A'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('2');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Qty: 2');

    
    await user.click(screen.getByText('Decrease A'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('1');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Qty: 1');

    
    await user.click(screen.getByText('Decrease A'));
    expect(screen.getByTestId('unique-count')).toHaveTextContent('0');
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();

    
    await user.click(screen.getByText('Add A'));
    await user.click(screen.getByText('Remove A'));
    expect(screen.getByTestId('unique-count')).toHaveTextContent('0');

    
    await user.click(screen.getByText('Add A'));
    await user.click(screen.getByText('Clear All'));
    expect(screen.getByTestId('total-count')).toHaveTextContent('0');
  });

  it('throws error when used outside of CartProvider', () => {
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<CartTester />)).toThrow('useCart must be used within a CartProvider');
    
    consoleSpy.mockRestore();
  });
});
