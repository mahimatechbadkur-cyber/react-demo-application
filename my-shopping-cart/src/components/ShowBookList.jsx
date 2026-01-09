import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';;
import { CardActionArea } from '@mui/material';
import { bookList, currency, dataTestIds, textContent } from '../common/constants'; 
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getImageURL } from '../utils/getImageURL';


function ShowBookList() {

const BookActions = ({ book}) => (
  <>
    <Stack direction="row" spacing={1}>
      <Button variant="contained" size="small">
        {textContent.addToCartButtonText}
      </Button>
      <Button variant="contained" size="small">
        {textContent.clearButtonText}
      </Button>
    </Stack>
    <Box sx={{ flexGrow: 1 }} />
    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
      {book.price} {currency}
    </Typography>
  </>
);

const BookList = ({ book}) => (
        <Grid size={{ xs: 12, sm: 4 }} key={book.id}>
          <Card variant="outlined">
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={getImageURL(book.title)}
                alt={book.title}
              />
            </CardActionArea>
            <Divider />
            <CardActions key={book.id}>
            <BookActions 
            book={book}  
          />
            </CardActions>
          </Card>
        </Grid>
);
  return (
    <>
     <Grid data-testid={dataTestIds.showBookList} size={{ xs: 12, md: 8 }} sx={{ border: '1px solid #ccc', bgcolor:'grey.200' }}>
        <Typography variant="h5"sx={{p:1,pl:2,bgcolor:'grey.300'}} >{textContent.bookListHeaderTitle}</Typography>
        <Divider />
          <Grid container spacing={2} sx={{p:2}}>
            {bookList.map((book) => (
            <BookList
                key={book.id}
                book={book} 
                textContent={textContent} 
                currency={currency} 
                getImageURL={getImageURL}  />
                ))} 
          </Grid>
        </Grid>
    </>
  )
}

export default ShowBookList
