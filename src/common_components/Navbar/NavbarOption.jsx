import { NavLink } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, Icon } from '@mui/material'
import { useState } from 'react'

const NavbarOption = ({ navPath, navTitle, open, navIcon, navIconHover }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <ListItem
      component={NavLink}
      to={navPath}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        color: hovered ? '#999999' : '#666666',
        textDecoration: 'none',
        marginBottom: 2
      }}
    >
      <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2, width: 'auto', height: 'auto' }}> 
        {hovered ? (<Icon> <img src={navIconHover} /> </Icon>) : 
            (<Icon> <img src={navIcon} /> </Icon>)}
      </ListItemIcon>
      <ListItemText>
        {open && <h2 className="text-lg whitespace-nowrap">
          {navTitle}
        </h2>
        }
      </ListItemText>
    </ListItem>
  );
};

export default NavbarOption
