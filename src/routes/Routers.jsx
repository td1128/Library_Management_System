import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserHome, Profile, Help } from "../pages/user";
// import { AdminHome } from "../pages/admin";
import { Routes } from "react-router-dom";
import IssueNotice from "../pages/admin/IssueNotice";

// import { Route, Routes } from 'react-router-dom'
// import { Help, Profile, UserHome } from '../pages/user';
import { AdminHome, Transaction, Settings } from '../pages/admin';
import ShowBookDetails from '../pages/user/bookDetails/ShowBookDetails'
import { userNavItems, adminNavItems } from './NavigationPaths'
import Layout from './Layout'

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route path="/user/*" element={<Layout rootPath="/user" navItems={userNavItems} />}>
          <Route index element={<UserHome />} />
          <Route path="book" element={<ShowBookDetails />} />  
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/admin/*" element={<Layout rootPath="/admin" navItems={adminNavItems} />}>
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="issue_notice" element={<IssueNotice/>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
