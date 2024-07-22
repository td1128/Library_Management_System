import { Route, Routes } from 'react-router-dom'
import { Help, Profile, UserHome, LandingPage, Books } from '../pages/user';
import { AdminHome, Transaction, Settings, AdminBook } from '../pages/admin';
import Layout from './Layout';
import { userNavItems, adminNavItems } from './NavigationPaths';
import ShowBookDetails from '../common_components/ViewBookDetails/ShowBookDetails'
import WishList from '../pages/user/wishlist/WishList';
import Footer from '../common_components/footer/Footer';

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<h1> Library Management System </h1>} />
        <Route path="/user/*" element={<Layout rootPath="/user" navItems={userNavItems} />}>
          <Route index element={<UserHome />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
          <Route path="books" >
            <Route index element={<Books />} />
            <Route path="view-details/:isbn" element={<ShowBookDetails type={'user'} />} />//view-details
            <Route path="wishlist" element={<WishList />} />//wishlist 
          </Route>
        </Route>
        <Route path="/admin/*" element={<Layout rootPath="/admin" navItems={adminNavItems} />}>
          <Route index element={<AdminHome />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="books/*" >
            <Route path="search" element={<AdminBook />} />
            <Route path="view-details/:isbn" element={<ShowBookDetails type={'admin'} />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  )
}

export default Routers
