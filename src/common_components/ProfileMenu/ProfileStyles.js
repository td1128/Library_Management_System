const profilestyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 2,
  },
  tooltip: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ml: 2,
  },
  avatar: { width: 36, height: 36, mr: 1 },
  paperprops: {
    elevation: 0,
    sx: {
      bgcolor: '#CCCCCC',
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: '#CCCCCC',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
}

export default profilestyles
