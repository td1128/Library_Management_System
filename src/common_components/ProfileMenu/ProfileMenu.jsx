import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Icon from '@mui/material/Icon'
import { useState } from 'react'
import profilestyles from './ProfileStyles'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box sx={profilestyles.root}>
        <p> John Doe </p>
        <Tooltip title="Profile Menu">
          <Box
            onClick={handleClick}
            sx={profilestyles.tooltip}
          >
            {' '}
            <Avatar sx={profilestyles.avatar}>
              <Icon>
                <img
                  src="/src/assets/icons/profile2-linear.png"
                  alt="Profile"
                />
              </Icon>
            </Avatar>
            <Icon>
              <img src="/src/assets/icons/arrow-down.png" />
            </Icon>
          </Box>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={profilestyles.paperprops}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>View Profile</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}
