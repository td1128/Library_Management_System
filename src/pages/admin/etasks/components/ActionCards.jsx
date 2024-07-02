// ActionCards.jsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const ActionCards = ({ subject, createdDate, dueDate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'rowReverse', justifyContent: 'flex-end' }}>
      <Card sx={{ width: "300px", marginBottom: '20px' , mr:5 }}>
        <CardContent>
          <Typography variant="h6">{subject}</Typography>
          <Typography variant="body2">Created on: {createdDate}</Typography>
          <Typography variant="body2">Due on: {dueDate}</Typography>
          <Button variant="outlined" style={{ marginTop: '10px' }}>Take Action</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCards;