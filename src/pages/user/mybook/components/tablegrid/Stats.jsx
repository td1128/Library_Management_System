import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:'#CCCCCC',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 117,
  width:290,
  textAlign: 'center',
  alignContent:"center",
  color: theme.palette.text.secondary,
}));

 function Stats() {
  return (
    <div className='statistics'>
    <Box sx={{ flexGrow: 10 , marginTop: 5, backgroundColor: '#F6F6F6',height:182
      , width:1101, alignContent:'center'
    }}>
      <Grid container spacing={50} >
        <Grid xs={2.5}>
          <Item>Current Borrowed Books</Item>
        </Grid>
        <Grid xs={2.5}>
          <Item>Total Fine</Item>
        </Grid>
        <Grid xs={2.5}>
          <Item>Latest Due Date</Item>
        </Grid>
      </Grid>
    </Box>

    </div>
  );
}
export default Stats;