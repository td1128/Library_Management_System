import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const data = [
  { label: 'Name', value: '' },
  { label: 'Roll Number', value: '' },
  { label: 'Joining Date', value: '' },
  { label: 'Library Card Number', value: '' },
  { label: 'Email ID', value: '' },
  { label: 'Phone Number', value: '' }
];

const CustomTable = () => {
  return (
    <TableContainer component={Paper} sx={{ border: 1, borderColor: 'maroon', backgroundColor: '#fae5e5' , ml:30, width: '500px'}}>
      <Table>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.label} sx={{ height: '10px' }}>
              <TableCell component="th" scope="row" sx={{ border: 1, borderColor: 'maroon',width:"200px",padding: '4px' }}>
                <Typography variant="body1" sx={{ color: 'maroon' }}>
                  {row.label}
                </Typography>
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: 'maroon' ,width: '300px' }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;