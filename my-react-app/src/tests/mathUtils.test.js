import { describe, it, expect } from 'vitest';
import { toEuros } from '../utils/mathUtils';
import { updateBookCounts } from '../utils/mathUtils';
import { makeBookSubsets } from '../utils/mathUtils';

describe('test for mathUtils', () => {
  it('converts cents to euros correctly', () => {
    expect(toEuros(100)).toBe(1.00);
    expect(toEuros(1234)).toBe(12.34);
    expect(toEuros(0)).toBe(0);
  });
  it('decrements specific indices correctly', () => {
    const initial = [5, 5, 5];
    const subset = [0, 2]; 
    expect(updateBookCounts(initial, subset)).toEqual([4, 5, 4]);
  });

  it('does not mutate the original array', () => {
    const initial = [5, 5, 5];
    const subset = [1];
    const result = updateBookCounts(initial, subset);
    expect(result).not.toBe(initial); 
    expect(initial).toEqual([5, 5, 5]); 
  });

  it('generates all non-empty subsets for 2 items', () => {
    const result = makeBookSubsets(2);
    
    expect(result).toHaveLength(3);
    expect(result).toEqual(expect.arrayContaining([[0], [1], [0, 1]]));
  });

  it('generates 7 subsets for 3 items (2^3 - 1)', () => {
    const result = makeBookSubsets(3);
    expect(result).toHaveLength(7);
  });

  it('returns an empty array for 0 unique books', () => {
    expect(makeBookSubsets(0)).toEqual([]);
  });

})