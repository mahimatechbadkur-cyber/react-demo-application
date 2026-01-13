import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';;
import { CardActionArea } from '@mui/material';
import { bookList, dataTestIds, textContent } from '../common/constants'; 
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getImageURL } from '../utils/getImageURL';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { useCart } from '../context/CartProvider';

function ShowBookList() {
  const { addToCart } = useCart();
  const BookActions = ({ book }) => (
    <>
      <IconButton onClick={() => addToCart(book)}  aria-label="addIcon" color="primary" size="small">
        <AddIcon />
      </IconButton>
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
        <Typography variant="h5" sx={{ p: 1, pl: 2, bgcolor:'grey.300' }}>{textContent.bookListHeaderTitle}</Typography>
        <Divider />
        <Grid container spacing={2} sx={{ p: 2 }}>
          {bookList.map((book) => (
            <BookList
              book={book} 
              key ={book.id}
            />
          ))} 
        </Grid>
      </Grid>
    </>
  )
}

export default ShowBookList
