import { Route, Routes } from 'react-router-dom'
import { Help, Profile, UserHome } from '../pages/user';
import { AdminHome, Transaction, Settings } from '../pages/admin';
import Layout from './Layout';
import { userNavItems, adminNavItems } from './NavigationPaths';
import ShowBookDetails from '../common_components/ViewBookDetails/ShowBookDetails'
import {Etasks} from "../pages/admin/etasks/Etasks";
import { MyBook } from "../pages/user";
const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route path="/user/*" element={<Layout rootPath="/user" navItems={userNavItems} />}>
          <Route index element={<UserHome />} />
          <Route path="book/viewdetails/:isbn" element={<ShowBookDetails type={'user'}/>} />  
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
            <Route path="mybook" element={<MyBook />} />
        </Route>
        <Route path="/admin/*" element={<Layout rootPath="/admin" navItems={adminNavItems} />}>
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings/library" element={<Settings />} />
             <Route path="etasks" element = {<Etasks/>} />
          <Route path="book/viewdetails/:isbn" element={<ShowBookDetails type={'admin'}/>} />  
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
