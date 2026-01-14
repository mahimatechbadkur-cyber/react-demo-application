import { describe, it, expect } from 'vitest';
import { getDiscountRate, calculateCartTotals} from '../utils/calculateCartTotals';
describe('getDiscountRate', () => {
  it('getDiscountRate returns correct percent for bundle sizes', () => {
    expect(getDiscountRate(1)).toBe(0);
    expect(getDiscountRate(2)).toBe(5); 
    expect(getDiscountRate(3)).toBe(10); 
    expect(getDiscountRate(4)).toBe(20); 
    expect(getDiscountRate(5)).toBe(25); 
  });

  it('calculateCartTotals returns subTotal and total with discount', () => {
    const books = [
      { id: 1, price: 50, quantity: 1 },
      { id: 2, price: 50, quantity: 1 }
    ];
    const result = calculateCartTotals(books);
    expect(result).toEqual({
      subTotal: 100,
      discount: 5,
      total: 95
    });
  });
});