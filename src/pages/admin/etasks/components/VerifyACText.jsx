import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function VerifyHead() {
  return (
    <Card variant="outlined" sx={{ maxWidth: 700 ,ml:30 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
          Verify account for New student 
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
        Please approve creation of the account if the below details seems legitimate, or reject.
        </Typography>
      </Box>
      <Divider />
    </Card>
  );
}
