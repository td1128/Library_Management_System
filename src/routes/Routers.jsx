import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserHome, Profile, Help } from "../pages/user";
import { AdminHome } from "../pages/admin";
import { Routes } from "react-router-dom";
import IssueNotice from "../pages/admin/IssueNotice";


const Routers = () => {
  return (
    <Routes>
          <Route path="/">
            <Route index element={<h1> Library Management System </h1>} />
            <Route path="user">
              <Route index element={<UserHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="help" element={<Help />} />
            </Route>
            <Route path="admin">
              <Route index element={<AdminHome />} />
              {/* <Route path="transaction" element={<Transaction />} /> */}
              {/* <Route path="settings" element={<Settings />} /> */}
              <Route path="issue-notice" element={<IssueNotice/>} />
            </Route>
          </Route> 
      </Routes>
  )
}

export default Routers
