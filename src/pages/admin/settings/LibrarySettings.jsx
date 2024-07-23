import React from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const LibrarySettings = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#651c33" }}>
          Library Settings
        </Typography>
        <form noValidate autoComplete="off">
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
          />
          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
          />
          <TextField
            fullWidth
            label="Working Hours"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              style: { color: "#651c33" },
            }}
            InputProps={{
              style: { backgroundColor: "#f8e6e6" },
            }}
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

export default LibrarySettings;