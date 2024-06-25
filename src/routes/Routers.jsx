import { Route, Routes } from 'react-router-dom'
import { Help, Profile, UserHome } from '../pages/user';
import { AdminHome, Transaction, Settings } from '../pages/admin';
import ShowBookDetails from '../pages/user/bookDetails/ShowBookDetails'
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import AdminBookDetails from '../pages/admin/adminBookDetails/AdminBookDetails';

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route path="/user/*" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="book" element={<ShowBookDetails />} />  
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="book" element={<AdminBookDetails />} />  
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
