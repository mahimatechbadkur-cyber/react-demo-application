import Grid from '@mui/material/Grid';
import ShowBookList from './ShowBookList';
import { dataTestIds } from '../common/constants';

function BookShopHomePage() {
  return (
    <>
    <Grid data-testid ={dataTestIds.bookShopHomePage} container spacing={1} sx={{pt:1}}>
      <ShowBookList />
    </Grid>
    </>
  )
}

export default BookShopHomePage
