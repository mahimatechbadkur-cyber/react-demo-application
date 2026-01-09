import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { textContent } from '../common/constants'; 

function BookShopHeaderBar() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Typography variant="h5" sx={{ flexGrow: 1, pl:4, textAlign: 'center'}}>
              {textContent.headingText}
          </Typography>
           <Typography variant="body2" component="div" sx={{ flexGrow: 1, pl:2, bgcolor:'#4CAF50' }}>
             {textContent.discountText}
          </Typography>
          </AppBar>
    </Box>
    </>
  )
}

export default BookShopHeaderBar
