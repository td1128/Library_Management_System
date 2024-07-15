import { NavLink } from 'react-router-dom'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  Collapse,
  Paper,
  Tooltip,
} from '@mui/material'
import { useState, useRef } from 'react'
import NavbarSubOption from './NavbarSubOption'
import navstyles from './NavbarStyles'

// Add tooltip
const NavbarOption = ({
  navPath,
  navTitle,
  open,
  navIcon,
  navIconHover,
  subPaths,
}) => {
  // Check if component is hovered to change styling
  const [hovered, setHovered] = useState(false)

  // Expand/collapse suboptions in open navbar
  const [collapsed, setCollapsed] = useState(true)

  // Expand/collapse overlay in closed navbar
  const [overlayVisible, setOverlayVisible] = useState(false)
  const overlayRef = useRef(null)

  const handleMouseEnter = () => {
    setHovered(true)
    if (!open) setOverlayVisible(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (!open) {
      setTimeout(() => {
        if (!overlayRef.current.matches(':hover')) {
          setOverlayVisible(false)
        }
      }, 100)
    }
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
          sx={hovered ? navstyles.pathtitle_hover : navstyles.pathtitle}
        >
          <Tooltip title={(!open ? navTitle: '')} placement="bottom">
            <ListItemIcon sx={navstyles.pathicon}>
              {hovered ? (
                <Icon fontSize="large">
                  {' '}
                  <img src={"https://raw.githubusercontent.com/Imamul5641/Library_Management_System/main"+navIconHover} width="100%" height="100%" />{' '}
                </Icon>
              ) : (
                <Icon fontSize="large">
                  {' '}
                  <img src={"https://raw.githubusercontent.com/Imamul5641/Library_Management_System/main"+navIcon} width="100%" height="100%" />{' '}
                </Icon>
              )}
            </ListItemIcon>
          </Tooltip>
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
              src="https://raw.githubusercontent.com/Imamul5641/Library_Management_System/main/src/assets/icons/arrow-down-white.png"
              height="22"
              width="22"
              className={!collapsed ? 'rotate-180' : ''}
            />
          </IconButton>
        )}
      </Box>
      {open && (
        <Collapse
          in={!collapsed}
          timeout="auto"
          unmountOnExit
          sx={{ width: '100%' }}
        >
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
      {!open && overlayVisible && subPaths.length > 0 && (
        <Paper
          ref={overlayRef}
          onMouseEnter={() => setOverlayVisible(true)}
          onMouseLeave={handleMouseLeave}
          sx={navstyles.overlay}
        >
          {subPaths.map((subPath, index) => (
            <div key={index} className="flex flex-col w-full">
              <NavbarSubOption
                title={subPath.subTitle}
                path={subPath.subPath}
              />
              <hr className="opacity-20" />
            </div>
          ))}
        </Paper>
      )}
    </ListItem>
  )
}

export default NavbarOption
