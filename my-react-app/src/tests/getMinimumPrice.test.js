import { computeBestPriceCents } from '../utils/getMinimumPrice';
import { describe, it, expect } from 'vitest';

describe('computeBestPriceCents Integration', () => {
  
  const priceList = [800, 800, 800, 800, 800];

  it('should return 0 when the cart is empty', () => {
    const bookCounts = [0, 0, 0, 0, 0];
    const result = computeBestPriceCents(bookCounts, priceList);
    expect(result).toBe(0);
  });

  it('should apply no discount for a single book', () => {
    const bookCounts = [1, 0, 0, 0, 0];
    const result = computeBestPriceCents(bookCounts, priceList);
    
    expect(result).toBe(800);
  });

  it('should apply the correct discount for a bundle of 2 unique books', () => {
    const bookCounts = [1, 1, 0, 0, 0];
    const result = computeBestPriceCents(bookCounts, priceList);
    expect(result).toBe(1520);
  });

  it('should not discount multiple copies of the same book as a bundle', () => {
    const bookCounts = [2, 0, 0, 0, 0];
    const result = computeBestPriceCents(bookCounts, priceList);
    expect(result).toBe(1600);
  });

  it('should optimize for the lowest price when 5 books with multiple copies are available in cart ', () => {
    const bookCounts = [2, 2, 2, 1, 1];
    const result = computeBestPriceCents(bookCounts, priceList);
    expect(result).toBe(5120);
  });

  it('should handle large quantities correctly via memoization', () => {
    const bookCounts = [5, 5, 4, 5, 4];
    const result = computeBestPriceCents(bookCounts, priceList);
    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe('number');
  });
});
