import { Route, Routes } from 'react-router-dom'
import { Help, Profile, UserHome } from '../pages/user';
import { AdminHome, Transaction, Settings } from '../pages/admin';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import ShowBookDetails from '../common_components/ViewBookDetails/ShowBookDetails'

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route path="/user/*" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="book/viewdetails/:isbn" element={<ShowBookDetails type={'user'}/>} />  
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="book/viewdetails" element={<ShowBookDetails type={'admin'}/>} />  
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
