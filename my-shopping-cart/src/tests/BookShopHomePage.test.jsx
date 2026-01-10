import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookShopHomePage  from '../components/BookShopHomePage';
import { dataTestIds} from '../common/constants';
import { vi } from 'vitest';

const addToCartMock = vi.fn();
const decreaseQuantityMock = vi.fn();

vi.mock('../context/CardProvider', () => ({
  useCart: () => ({ 
    cart: [
      { id: 1, title: 'Clean Code', price: 50, quantity: 2 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 2 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 2 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ],
    addToCart: addToCartMock,
    decreaseQuantity: decreaseQuantityMock
  }),
}));


describe('BookShopHomePage component', () => {
  it('render BookshopHomePage ', () => {
    render(<BookShopHomePage />);
    expect(screen.getByTestId(dataTestIds.bookShopHomePage)).toBeInTheDocument();
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument()
  });
});