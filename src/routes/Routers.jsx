import { Route, Routes } from 'react-router-dom'

import { Help, Profile, UserHome, LandingPage, Books } from '../pages/user'
import { AdminHome, Transaction, Settings, AddBook, AdminBook } from '../pages/admin'
import ShowBookDetails from '../common_components/ViewBookDetails/ShowBookDetails'
import { userNavItems, adminNavItems } from './NavigationPaths'
import Layout from './Layout'

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route
          path="/user/*"
          element={<Layout rootPath="/user" navItems={userNavItems} />}
        >
          <Route index element={<UserHome />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="book">
            <Route index element={<Books />} />
            <Route
              path="viewdetails/:isbn"
              element={<ShowBookDetails type={'user'} />}
            />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route
          path="/admin/*"
          element={<Layout rootPath="/admin" navItems={adminNavItems} />}
        >
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="book">
            <Route path="add" element={<AddBook />} />
            <Route
              path="viewdetails/:isbn"
              element={<ShowBookDetails type={'admin'} />}
            />
            <Route path="search" element={<AdminBook />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
