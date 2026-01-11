import { DISCOUNT_TIERS } from '../common/constants';

export const getDiscountRate = (size) => {
  switch (true) {
  case size >= DISCOUNT_TIERS[0].size:
    return DISCOUNT_TIERS[0].rate;
  case size === DISCOUNT_TIERS[1].size:
    return DISCOUNT_TIERS[1].rate;
  case size === DISCOUNT_TIERS[2].size:
    return DISCOUNT_TIERS[2].rate;
  case size === DISCOUNT_TIERS[3].size:
    return DISCOUNT_TIERS[3].rate;
  default:
    return 0;
  }
};

const makeSubsets = (n) => {
  const indices = Array.from({ length: n }, (_, i) => i);
  return indices
    .reduce((acc, idx) => acc.concat(acc.map(s => s.concat(idx))), [[]])
    .slice(1); 
};

const computeBestPriceCents = (bookCountsArray, pricesCents) => {
  const bookCountArrayLength = bookCountsArray.length;
  const lookUpKey = new Map();
  const booksAllPossibleSubsets = makeSubsets(bookCountArrayLength);
  const keyFrom = (bookCurrentCount) => bookCurrentCount.join(',');

  const helper = (bookCurrentCountsArray) => {
    const key = keyFrom(bookCurrentCountsArray);
    if (lookUpKey.has(key)) return lookUpKey.get(key);
    if (bookCurrentCountsArray.every(bookCount => bookCount === 0)) {
      const result = { price: 0, breakdown: {} };
      lookUpKey.set(key, result);
      return result;
    }

    let bestBookSubset = { price: Infinity, breakdown: {} };

    for (const index of booksAllPossibleSubsets) {
      if (!index.every(i => bookCurrentCountsArray[i] > 0)) continue;

      const bookSubsetSize = index.length;
      const bookSubsetPrice = index.reduce((sum, index) => sum + pricesCents[index], 0);
      const percent = getDiscountRate(bookSubsetSize);
      const discounted = Math.round(bookSubsetPrice * (100 - percent) / 100);

      const bookCountNextSubset = bookCurrentCountsArray.slice();
      index.forEach(index => { bookCountNextSubset[index] -= 1; });

      const restBookCountSubset = helper(bookCountNextSubset);
      const total = discounted + restBookCountSubset.price;

      
      if (total < bestBookSubset.price) {
        const breakdown = { ...restBookCountSubset.breakdown };
        breakdown[bookSubsetSize] = (breakdown[bookSubsetSize] || 0) + 1;
        bestBookSubset = { price: total, breakdown };
      }
    }

    lookUpKey.set(key, bestBookSubset);
    return bestBookSubset;
  };

  return helper(bookCountsArray);
};

export const calculateCartTotals = (books) => {
  if (books.length === 0) return { subtotal: 0, discount: 0, total: 0, breakdown: {} };

  const pricesCents = books.map(book => Math.round((book.price || 0) * 100));
  const bookCounts = books.map(book => book.quantity || 0);
  const bookSubtotalCents = bookCounts.reduce((totalQuantity, quantity, index) => totalQuantity + quantity * pricesCents[index], 0);

  const { price: bestPriceCents, breakdown } = computeBestPriceCents(bookCounts, pricesCents);
  const discountCents = bookSubtotalCents - bestPriceCents;

  const toEuros = (cents) => Number((cents / 100).toFixed(2));

  return {
    subtotal: toEuros(bookSubtotalCents),
    discount: toEuros(discountCents),
    total: toEuros(bestPriceCents),
    breakdown, 
  };
};
