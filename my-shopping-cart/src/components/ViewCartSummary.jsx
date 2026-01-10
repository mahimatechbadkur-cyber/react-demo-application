import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import { textContent,currency, dataTestIds } from "../common/constants"

function ViewCartSummary() {
  return (
    <>
      <Box sx={{ m: 1 }} data-testid = {dataTestIds.viewCartSummaryPage}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pb: 1 }}>
          {textContent.orderSummaryText}
        </Typography>
        <Typography variant="body2">
          {textContent.subtotalText}: {textContent.dummyData.subtotal} {currency}
        </Typography>
        <Typography variant="body2">
          {textContent.discountedPriceText}: {textContent.dummyData.discountedPrice} {currency}
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}>
          {textContent.totalAmountText}: {textContent.dummyData.totalAmount} {currency}
        </Typography>
        <Button variant="contained" fullWidth >{textContent.checkoutButtonText}</Button>
      </Box>
    </>
  )
}
export default ViewCartSummary
