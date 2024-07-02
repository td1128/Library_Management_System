import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, InputAdornment } from '@mui/material';
import axios from 'axios';

export const Settings = () => {
  const [libraryName, setLibraryName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [openingHoursSunday, setOpeningHoursSunday] = useState('');
  const [openingHoursOtherday, setOpeningHoursOtherday] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      library_name: libraryName,
      address: address,
      contact_info: contactInfo,
      opening_hours_sunday: openingHoursSunday,
      opening_hours_otherday: openingHoursOtherday,
    };

    try {
      const response = await axios.put('https://library-management-system-ce6z.onrender.com/api/admin/set-settings', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAlert({ type: 'success', message: 'Settings updated successfully!' });
    } catch (error) {
      setAlert({ type: 'error', message: error.response ? error.response.data : 'Failed to update settings.' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#651c33" }}>
          Library Settings
        </Typography>
        {alert.message && (
          <Alert severity={alert.type} onClose={() => setAlert({ type: '', message: '' })}>
            {alert.message}
          </Alert>
        )}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name of Library"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contact Info"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
          <TextField
            fullWidth
            label="Opening Hours (Sunday)"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
              startAdornment: <InputAdornment position="start">hh:mm:ss</InputAdornment>,
            }}
            value={openingHoursSunday}
            onChange={(e) => setOpeningHoursSunday(e.target.value)}
          />
          <TextField
            fullWidth
            label="Opening Hours (Other Days)"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
              startAdornment: <InputAdornment position="start">hh:mm:ss</InputAdornment>,
            }}
            value={openingHoursOtherday}
            onChange={(e) => setOpeningHoursOtherday(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#651c33",
              color: "#fff",
              marginTop: "20px",
              borderRadius: "20px",
            }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};