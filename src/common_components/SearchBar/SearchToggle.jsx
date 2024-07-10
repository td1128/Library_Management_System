import { Button } from '@mui/material'

export const SearchToggle = ({ title, value, setValue }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => setValue(!value)}
      sx={{
        minWidth: 120,
        height: 56,
        bgcolor: value ? '#CCCCCC' : 'inherit',
        color: value ? 'inherit' : '#666666',
        borderColor: 'rgba(0, 0, 0, 0.23)', 
        fontSize: 'inherit',
        textTransform: 'none',
        '&:hover': {
          bgcolor: value ? '#CCCCCC' : 'rgba(0, 0, 0, 0.04)',
          borderColor: 'rgba(0, 0, 0, 0.23)', 
        },
      }}
    >
      {title}
    </Button>
  )
}
