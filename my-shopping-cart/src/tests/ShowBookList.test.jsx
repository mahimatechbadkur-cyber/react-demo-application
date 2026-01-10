import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ShowBookList  from '../components/ShowBookList';
import { dataTestIds,textContent,bookList, currency} from '../common/constants';
import { afterEach,vi } from 'vitest';

const addToCartMock = vi.fn();
const decreaseQuantityMock = vi.fn();

vi.mock('../context/CardProvider', () => ({
  useCart: () => ({ addToCart: addToCartMock,
    decreaseQuantity: decreaseQuantityMock
   }),
}));

afterEach(() => {
  cleanup();
  addToCartMock.mockReset();
  decreaseQuantityMock.mockReset();
});

describe('ShowBookList component', () => {
  it('should render ShowBookList component and other UI elements ', () => {
    render(<ShowBookList />);
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    expect(screen.getByRole('heading').textContent).toBe(textContent.bookListHeaderTitle);
   const addButton = screen.getAllByRole('button', { name: /addIcon/i });
   const removeButton = screen.getAllByRole('button', { name: /removeIcon/i });
   expect(addButton[0]).toBeInTheDocument();
   expect(removeButton[0]).toBeInTheDocument();
    expect(screen.getAllByText(bookList[0].price + ' ' + currency)[0].textContent).toBe(bookList[0].price + ' ' + currency);
  });
});