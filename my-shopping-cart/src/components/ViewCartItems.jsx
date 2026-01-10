import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { textContent, dummyCartItem,currency, dataTestIds } from '../common/constants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';;
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import ViewCartSummary from './ViewCartSummary'
import EmptyCartView from './EmptyCartView';

function ViewCartItems() {

  const GetCartList = ({ cartItem }) => (
    <Card sx={{ display: 'flex', bgcolor:'grey.100', m: 1 }} key={cartItem.id} >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{
          padding: 2,
          pb: 0,
          pt: 1,           
          "&:last-child": { 
            paddingBottom: 0   
          } 
        }}> 
          <Typography component="div" variant="subtitle1" sx={{ fontWeight: 'bold'}}>
            {cartItem.title}
          </Typography>
          <Stack direction="row" sx={{ mt:1 }}>
            <Typography component="div" variant="subtitle2">
              {cartItem.price} {currency}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: 'text.secondary',ml:4 }}
            >
              {`${textContent.quantityText}: ${cartItem.quantity}`}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small"  startIcon={<CloseIcon  size="small"/>} sx={{p:0, pl:1}}>{textContent.removeCartButtonTitle}</Button>
        </CardActions>
      </Box>
    </Card>
  );

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }} sx={{ border: '1px solid #ccc', bgcolor:'grey.200' }} data-testid ={dataTestIds.viewCartItemsPage}>
        <Typography variant="h5"sx={{p:1,pl:2,bgcolor:'grey.300'}} >{textContent.cartItemListHeaderTitle}</Typography>
        <Divider />
        {dummyCartItem.length>0 ? (
          <>
            {dummyCartItem.map((cartItem) => (
              <GetCartList cartItem={cartItem} key={cartItem.id} />
            ))}
            <Divider sx={{boxShadow:2, ml:1,mr:1}}/>
            <ViewCartSummary />
          </>
        ) : <EmptyCartView />}
      </Grid>
    </>
  )
}

export default ViewCartItems
      