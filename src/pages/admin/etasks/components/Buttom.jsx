import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function ButtonGrp() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
    >
      <Button sx={{ ml: 30 }}>Approve</Button>
      <Button sx={{ ml: 50 }}>Reject</Button>
    </ButtonGroup>
  );
}