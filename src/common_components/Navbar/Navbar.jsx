import NavbarOption from './NavbarOption'
import './Navbar.css'
import { useState } from 'react'
import NavbarMenu from './NavbarMenu'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const Navbar = ({ rootPath, navItems }) => {
  const navigate = useNavigate();
  useEffect(()=>{//TODO check the user details from profile reducer that user is logged in or not
    const location = window.location.href;
    const tokens = location.split('/');
    const path = tokens[tokens.length - 1];

    if(path === 'viewdetails'){
      toast.error("Please provide book isbn number!")
      navigate("/")
    }
  })
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
