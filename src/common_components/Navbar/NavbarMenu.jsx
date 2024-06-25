import { List, ListItem, Box, Icon } from '@mui/material'
import navstyles from './NavbarStyles'
import { NavLink } from 'react-router-dom'

const NavbarMenu = ({ children, open, setOpen, rootPath }) => {
  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="flex pr-4">
      <Box sx={open ? navstyles.root_open : navstyles.root_closed}>
        <List sx={navstyles.list}>
          <ListItem component={NavLink} to={rootPath} sx={navstyles.titlebox}>
            <Box sx={navstyles.icon}>
              <img
                src="/src/assets/icons/book-black.png"
                width="100%"
                height="100%"
              />
            </Box>
            {open && (
              <h2 className="text-4xl font-bold text-white"> LitLib </h2>
            )}
          </ListItem>

          {children}

          <ListItem
            button
            onClick={handleDrawerToggle}
            sx={{ justifyContent: 'right', marginBottom: 6, marginTop: 'auto' }} // Push to bottom
          >
            {open ? (
              <Icon fontSize="large">
                <img src="/src/assets/icons/arrow-white.png" height="100%" width="100%"/>
              </Icon>
            ) : (
              <Icon fontSize="large">
                <img src="/src/assets/icons/arrow-white.png" height="100%" width="100%" className="rotate-180"/>
              </Icon>
            )}
          </ListItem>
        </List>
      </Box>
    </div>
  )
}

export default NavbarMenu
