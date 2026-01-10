import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewCartSummary  from '../components/ViewCartSummary';
import { dataTestIds,textContent, currency} from '../common/constants';


describe('ViewCartSummary component', () => {
  it('should render ViewCartSummary component and other UI elements when cart is filled', () => {
    render(<ViewCartSummary />);
    expect(screen.getByTestId(dataTestIds.viewCartSummaryPage)).toBeInTheDocument();
    expect(screen.getByText(textContent.orderSummaryText)).toBeInTheDocument();
    expect(screen.getByText(textContent.subtotalText +':' + ' ' + textContent.dummyData.subtotal + ' ' + currency).textContent).toBe('Subtotal: 200 EUR');
    expect(screen.getByText(textContent.discountedPriceText +':' + ' ' + textContent.dummyData.discountedPrice + ' ' + currency).textContent).toBe('Discounted Price: 100 EUR');
    expect(screen.getByText(textContent.totalAmountText +':' + ' ' + textContent.dummyData.totalAmount + ' ' + currency).textContent).toBe('Total Amount: 100 EUR');
    expect(screen.getByText(textContent.checkoutButtonText).textContent).toBe(textContent.checkoutButtonText);
  });
});