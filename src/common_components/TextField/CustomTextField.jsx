// components/common/CustomTextField.js
import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, value, onChange, margin = "normal", ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      margin={margin}
      InputLabelProps={{ style: { color: '#651c33' } }}
      InputProps={{ style: { backgroundColor: '#f8e6e6' } }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;