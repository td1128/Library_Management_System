import { Outlet } from 'react-router-dom'
import UserNavbar from '../common_components/Navbar/UserNavbar'

const UserLayout = () => {
  return (
    <div className="flex flex-grow w-full">
      <UserNavbar />
      <Outlet />
    </div>
  )
}

export default UserLayout
