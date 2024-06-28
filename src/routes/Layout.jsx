import { Outlet } from 'react-router-dom'
import MuiBreadcrumbs from '../common_components/breadcrumbs/MuiBreadcrumbs'
import ProfileMenu from '../common_components/ProfileMenu/ProfileMenu'
import Navbar from '../common_components/Navbar/Navbar'

const Layout = ({ rootPath, navItems }) => {
  return (
    <div className="flex flex-grow w-full">
      <Navbar rootPath={rootPath} navItems={navItems} />
      <div className="flex flex-col w-full">
        <div className="flex justify-between px-2">
          <MuiBreadcrumbs />
          <ProfileMenu />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
