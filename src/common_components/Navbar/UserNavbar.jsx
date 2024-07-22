import { useState } from 'react'
import NavbarOption from './NavbarOption'
import NavbarMenu from './NavbarMenu'

const userNavItems = [
  {
    navPath: '/user/',
    navTitle: 'Home',
    navIcon: '/src/assets/icons/home-linear.png',
    navIconHover: '/src/assets/icons/home-bulk.png',
  },
  {
    navPath: '/user/books',
    navTitle: 'Books',
    navIcon: '/src/assets/icons/book-linear.png',
    navIconHover: '/src/assets/icons/book-bulk.png',
  },
  {
    navPath: '/user/my_books',
    navTitle: 'My Books',
    navIcon: '/src/assets/icons/book2-linear.png',
    navIconHover: '/src/assets/icons/book2-bulk.png',
  },
  {
    navPath: '/user/profile',
    navTitle: 'Profile',
    navIcon: '/src/assets/icons/profile2-linear.png',
    navIconHover: '/src/assets/icons/profile2-bulk.png',
  },
  {
    navPath: '/user/help',
    navTitle: 'Help',
    navIcon: '/src/assets/icons/help-linear.svg',
    navIconHover: '/src/assets/icons/help-bulk.png',
  },
]

const UserNavbar = () => {
  const [open, setOpen] = useState(true)
  return (
    <NavbarMenu open={open} setOpen={setOpen}>
      {userNavItems.map((item, index) => (
        <NavbarOption
          key={index}
          navPath={item.navPath}
          navTitle={item.navTitle}
          navIcon={item.navIcon}
          navIconHover={item.navIconHover}
          open={open}
        />
      ))}
    </NavbarMenu>
  )
}

export default UserNavbar
