import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const CustomTimeField = ({ label, value, onChange, ...props }) => {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        label={label}
        variant="outlined"
        type="time"
        margin="normal"
        InputLabelProps={{ shrink: true, style: { color: '#651c33' } }}
        InputProps={{ style: { backgroundColor: '#f8e6e6' } }}
        value={value}
        onChange={onChange}
        inputProps={{ step: 300 }} 
        style={{ marginRight: '10px' }}
        {...props}
      />
      <Typography variant="body1" mx={2}>
        to
      </Typography>
    </Box>
  );
};

export default CustomTimeField;