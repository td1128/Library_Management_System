import NavbarOption from './NavbarOption'
import './Navbar.css'
import { useState } from 'react'
import NavbarMenu from './NavbarMenu'

const Navbar = ({ rootPath, navItems }) => {
  const [open, setOpen] = useState(true)
  return (
    <NavbarMenu open={open} setOpen={setOpen} rootPath={rootPath}>
      {navItems.map((item, index) => (
        <NavbarOption
          key={index}
          navPath={item.navPath}
          navTitle={item.navTitle}
          navIcon={item.navIcon}
          navIconHover={item.navIconHover}
          open={open}
          subPaths={item.subPaths}
        />
      ))}
    </NavbarMenu>
  )
}

export default Navbar
