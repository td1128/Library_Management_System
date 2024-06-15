import { Outlet } from 'react-router-dom'
import AdminNavbar from '../common_components/Navbar/AdminNavbar'

const AdminLayout = () => {
  return (
    <div className="flex flex-grow w-full">
      <AdminNavbar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
