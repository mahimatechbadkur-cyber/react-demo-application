import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { dataTestIds } from './common/constants';
import ViewCartItems from '../components/ViewCartItems';
import { CartProvider } from '../context/CartProvider';

describe('ViewCartItems component', () => {
  it('render ViewCartItems', () => {
    render(
      <CartProvider>
        <ViewCartItems />
      </CartProvider>);
    expect(screen.getByTestId(dataTestIds.viewCartItemsPage)).toBeInTheDocument();
  });
});