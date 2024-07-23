
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const bgColor = '#f8e6e6';

export const Settings = () => {
  const [libraryName, setLibraryName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [libraryEmail, setLibraryEmail] = useState('');
  const [openingHoursSunday, setOpeningHoursSunday] = useState({ open: '00:00', close: '00:00' });
  const [openingHoursOtherday, setOpeningHoursOtherday] = useState({ open: '00:00', close: '00:00' });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeError, setTimeError] = useState('');

  const fetchSettings = async () => {
    try {
      const response = await axios.get('https://library-management-system-ce6z.onrender.com/api/admin/get-settings');
      const data = response.data;
      setLibraryName(data.library_name);
      setAddress(data.address);
      setContactInfo(data.contact_info);
      setLibraryEmail(data.library_email);
      setOpeningHoursSunday(parseOpeningHours(data.opening_hours_sunday));
      setOpeningHoursOtherday(parseOpeningHours(data.opening_hours_otherday));
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch settings.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const parseOpeningHours = (timeRange) => {
    if (!timeRange) return { open: '00:00', close: '00:00' };
    const [open, close] = timeRange.split(' - ');
    return { open, close };
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setIsUpdated(true);
  };

  const handleTimeChange = (setter, key) => (e) => {
    setter((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
    setIsUpdated(true);
  };

  // Validate time inputs
  const validateTimes = () => {
    if (openingHoursSunday.open > openingHoursSunday.close) {
      setTimeError('Sunday opening time must be earlier than closing time.');
      return false;
    }
    if (openingHoursOtherday.open > openingHoursOtherday.close) {
      setTimeError('Other days opening time must be earlier than closing time.');
      return false;
    }
    setTimeError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTimes()) return;
    setTempData({
      id: 101,
      library_name: libraryName,
      address: address,
      contact_info: contactInfo,
      library_email: libraryEmail,
      opening_hours_sunday: `${openingHoursSunday.open} - ${openingHoursSunday.close}`,
      opening_hours_otherday: `${openingHoursOtherday.open} - ${openingHoursOtherday.close}`,
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogApply = async () => {
    try {
      await axios.put(
        'https://library-management-system-ce6z.onrender.com/api/admin/set-settings',
        tempData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAlert({ type: 'success', message: 'Settings updated successfully!' });
      setIsUpdated(false);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response ? error.response.data : 'Failed to update settings.',
      });
    }
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: '#651c33' }}>
          Library Settings
        </Typography>
        {alert.message && (
          <Alert severity={alert.type} onClose={() => setAlert({ type: '', message: '' })}>
            {alert.message}
          </Alert>
        )}
        {timeError && (
          <Typography color="white" variant="body2" backgroundColor="#651c33">
            {timeError}
          </Typography>
        )}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name of Library"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: '#651c33' } }}
            InputProps={{ style: { backgroundColor: bgColor } }}
            value={libraryName}
            onChange={handleChange(setLibraryName)}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: '#651c33' } }}
            InputProps={{ style: { backgroundColor: bgColor } }}
            value={address}
            onChange={handleChange(setAddress)}
          />
          <TextField
            fullWidth
            label="Contact Info"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: '#651c33' } }}
            InputProps={{ style: { backgroundColor: bgColor } }}
            value={contactInfo}
            onChange={handleChange(setContactInfo)}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: '#651c33' } }}
            InputProps={{ style: { backgroundColor: bgColor } }}
            value={libraryEmail}
            onChange={handleChange(setLibraryEmail)}
          />
          <Box mb={2}>
            <Typography variant="subtitle1">Weekdays</Typography>
            <Box display="flex" alignItems="center">
              <TextField
                label="Opening Time"
                variant="outlined"
                type="time"
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: '#651c33' } }}
                InputProps={{ style: { backgroundColor: bgColor } }}
                value={openingHoursOtherday.open}
                onChange={handleTimeChange(setOpeningHoursOtherday, 'open')}
                inputProps={{ step: 300 }}
                style={{ marginRight: '10px' }}
              />
              <Typography variant="body1" mx={2}>
                to
              </Typography>
              <TextField
                label="Closing Time"
                variant="outlined"
                type="time"
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: '#651c33' } }}
                InputProps={{ style: { backgroundColor: bgColor } }}
                value={openingHoursOtherday.close}
                onChange={handleTimeChange(setOpeningHoursOtherday, 'close')}
                inputProps={{ step: 300 }}
              />
            </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Weekend</Typography>
            <Box display="flex" alignItems="center">
              <TextField
                label="Opening Time"
                variant="outlined"
                type="time"
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: '#651c33' } }}
                InputProps={{ style: { backgroundColor: bgColor } }}
                value={openingHoursSunday.open}
                onChange={handleTimeChange(setOpeningHoursSunday, 'open')}
                inputProps={{ step: 300 }}
                style={{ marginRight: '10px' }}
              />
              <Typography variant="body1" mx={2}>
                to
              </Typography>
              <TextField
                label="Closing Time"
                variant="outlined"
                type="time"
                margin="normal"
                InputLabelProps={{ shrink: true, style: { color: '#651c33' } }}
                InputProps={{ style: { backgroundColor: bgColor } }}
                value={openingHoursSunday.close}
                onChange={handleTimeChange(setOpeningHoursSunday, 'close')}
                inputProps={{ step: 300 }}
              />
            </Box>
          </Box>
          
          </Box>
          <Button
  type="submit"
  variant="contained"
  fullWidth
  disabled={!isUpdated}
  style={{ 
    backgroundColor: isUpdated ? '#651c33' : '#ccc', 
    color: isUpdated ? 'white' : 'black' 
  }}
>
  UPDATE
</Button>
        </form>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Update</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to update the library settings?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogApply} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
  };

