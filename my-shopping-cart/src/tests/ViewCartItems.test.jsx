import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewCartItems  from '../components/ViewCartItems';
import { dataTestIds,textContent,dummyCartItem, currency} from '../common/constants';


describe('ViewCartItems component', () => {
  it('should render ViewCartItems component and other UI elements when cart is filled', () => {
    render(<ViewCartItems />);
    expect(screen.getByTestId(dataTestIds.viewCartItemsPage)).toBeInTheDocument();
    expect(screen.getByText(textContent.cartItemListHeaderTitle)).toBeInTheDocument();
    expect(screen.getAllByText(dummyCartItem[0].title)[0].textContent).toBe(dummyCartItem[0].title);
    expect(screen.getAllByText(dummyCartItem[0].price + ' ' + currency)[0].textContent).toBe(dummyCartItem[0].price + ' ' + currency);
     expect(screen.getAllByText(textContent.quantityText +':'+ ' ' + dummyCartItem[0].quantity)[0].textContent).toBe(textContent.quantityText +':'+ ' ' + dummyCartItem[0].quantity);
    expect(screen.getAllByText(textContent.removeCartButtonTitle)[4].textContent).toBe(textContent.removeCartButtonTitle);
  });
});