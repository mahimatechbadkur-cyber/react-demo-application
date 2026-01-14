import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import { textContent,currency, dataTestIds } from "../common/constants"
import { useCart } from '../context/CartProvider';
import { calculateCartTotals } from '../utils/calculateCartTotals';

function ViewCartSummary() {
  const { cart } = useCart();
  const bestPrice = calculateCartTotals(cart)
  const { subTotal, discount, total} = bestPrice
  return (
    <>
      <Box sx={{ m: 1 }} data-testid = {dataTestIds.viewCartSummaryPage}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pb: 1 }}>
          {textContent.orderSummaryText}
        </Typography>
        <Typography variant="body2">
          {textContent.subtotalText}: {subTotal} {currency}
        </Typography>
        <Typography variant="body2">
          {textContent.discountedPriceText}: {discount} {currency}
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          {textContent.totalAmountText}: {total} {currency}
        </Typography>
      </Box>
    </>
  )
}
export default ViewCartSummary
