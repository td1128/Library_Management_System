import NavbarOption from './NavbarOption'
import './Navbar.css'
import { useState } from 'react'
import NavbarMenu from './NavbarMenu'

const adminNavItems = [
  {
    navPath: '/admin/',
    navTitle: 'Home',
    navIcon: '/src/assets/icons/home-linear.png',
    navIconHover: '/src/assets/icons/home-bulk.png',
  },
  {
    navPath: '/admin/books',
    navTitle: 'Books',
    navIcon: '/src/assets/icons/book-linear.png',
    navIconHover: '/src/assets/icons/book-bulk.png',
  },
  {
    navPath: '/admin/transaction',
    navTitle: 'Transactions',
    navIcon: '/src/assets/icons/transaction-linear.svg',
    navIconHover: '/src/assets/icons/transaction-bulk.png',
  },
  {
    navPath: '/admin/issue_notice',
    navTitle: 'Issue Notice',
    navIcon: '/src/assets/icons/notification-linear.svg',
    navIconHover: '/src/assets/icons/notification-bulk.png',
  },
  {
    navPath: '/admin/settings',
    navTitle: 'Settings',
    navIcon: '/src/assets/icons/setting-linear.png',
    navIconHover: '/src/assets/icons/setting-bulk.png',
  },
]

const AdminNavbar = () => {
  const [open, setOpen] = useState(true)
  return (
    <NavbarMenu open={open} setOpen={setOpen}>
      {adminNavItems.map((item, index) => (
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

export default AdminNavbar
