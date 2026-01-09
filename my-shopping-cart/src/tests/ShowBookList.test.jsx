import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ShowBookList  from '../components/ShowBookList';
import { dataTestIds,textContent,bookList, currency} from '../common/constants';


describe('ShowBookList component', () => {
  it('should render ShowBookList component and other UI elements ', () => {
    render(<ShowBookList />);
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    expect(screen.getByRole('heading').textContent).toBe(textContent.bookListHeaderTitle);
    expect(screen.getAllByText(textContent.addToCartButtonText)[0].textContent).toBe(textContent.addToCartButtonText);
    expect(screen.getAllByText(textContent.clearButtonText)[4].textContent).toBe(textContent.clearButtonText);
    expect(screen.getAllByText(bookList[0].price + ' ' + currency)[0].textContent).toBe(bookList[0].price + ' ' + currency);
  });
});