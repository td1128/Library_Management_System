import { NavLink } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from '@mui/material'
import { useState } from 'react'
import NavbarSubOption from './NavbarSubOption'
import navstyles from './NavbarStyles'

const NavbarOption = ({
  navPath,
  navTitle,
  open,
  navIcon,
  navIconHover,
  subPaths,
}) => {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <ListItem sx={navstyles.option}>
      <Box
        component={NavLink}
        to={navPath}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={hovered ? navstyles.pathtitle_hover : navstyles.pathtitle}
      >
        <ListItemIcon sx={navstyles.pathicon}>
          {hovered ? (
            <Icon fontSize="large">
              {' '}
              <img src={navIconHover} width="100%" height="100%" />{' '}
            </Icon>
          ) : (
            <Icon fontSize="large">
              {' '}
              <img src={navIcon} width="100%" height="100%" />{' '}
            </Icon>
          )}
        </ListItemIcon>
        <ListItemText>
          {open && <h2 className="text-lg font-bold whitespace-nowrap">{navTitle}</h2>}
        </ListItemText>
      </Box>
      {open &&
        subPaths.map((subPath, index) => (
          <div key={index} className="flex flex-col w-full">
          <NavbarSubOption
            title={subPath.subTitle}
            path={subPath.subPath}
          />
          <hr />
          </div>
        ))}
    </ListItem>
  )
}

export default NavbarOption
