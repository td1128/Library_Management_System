import { NavLink } from 'react-router-dom'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  Collapse,
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
  const [collapsed, setCollapsed] = useState(true)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ListItem sx={navstyles.option}>
      <Box sx={navstyles.pathbox}>
        <Box
          component={NavLink}
          to={navPath}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggleCollapse}
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
            {open && (
              <h2 className="text-lg font-bold whitespace-nowrap">
                {navTitle}
              </h2>
            )}
          </ListItemText>
        </Box>
        {open && subPaths.length > 0 && (
          <IconButton onClick={handleToggleCollapse} size="small">
            <img
              src="/src/assets/icons/arrow-down.png"
              height="28"
              width="28"
              className={collapsed ? 'rotate-180' : ''}
            />
          </IconButton>
        )}
      </Box>
      {open && (
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          {subPaths.map((subPath, index) => (
            <div key={index} className="flex flex-col w-full">
              <NavbarSubOption
                title={subPath.subTitle}
                path={subPath.subPath}
              />
              <hr />
            </div>
          ))}
        </Collapse>
      )}
    </ListItem>
  )
}

export default NavbarOption
