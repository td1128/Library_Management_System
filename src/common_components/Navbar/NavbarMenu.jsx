import { List, ListItem, Box, Icon } from '@mui/material'

const NavbarMenu = ({ children, open, setOpen }) => {
  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const drawerWidthOpen = 220
  const drawerWidthClosed = 60
  return (
    <div className="flex mb-6 px-4">
      <Box
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          bgcolor: '#CCCCCC',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <List>
          <ListItem>
            <Box
              sx={{
                width: 28,
                height: 28,
                bgcolor: '#666666',
                borderRadius: '50%',
              }}
            ></Box>
          </ListItem>
          <ListItem
            button
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'space-between', marginBottom: 6 }}
          >
            {open && <h2 className="navbar_title"> JU LIBRARY </h2>}
            {open ? (
              <Icon>
                <img src="/src/assets/icons/arrow-circle-left.svg" />
              </Icon>
            ) : (
              <Icon>
                <img src="/src/assets/icons/arrow-circle-right.svg" />
              </Icon>
            )}
          </ListItem>
          {children}
        </List>
      </Box>
    </div>
  )
}

export default NavbarMenu
