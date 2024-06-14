import { Box,Breadcrumbs,Link, Typography } from "@mui/material";
import React from 'react'

function MuiBreadcrumbs() {
  return (
    <Box m={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" underline="hover">
          Home
        </Link>
        <Link color="inherit" href="/admin" underline="hover">
          Admin
        </Link>
        <Typography color="text.primary">Settings</Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default MuiBreadcrumbs
