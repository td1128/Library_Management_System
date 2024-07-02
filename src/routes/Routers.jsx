import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserHome } from "../pages/user";
import { AdminHome } from "../pages/admin";
import { Routes } from "react-router-dom";
import { MyBook } from "../pages/user";
import {Etasks} from "../pages/admin/etasks/Etasks";
import {Settings} from "../pages/admin/Settings"
const Routers = () => {
  return (
    <Routes>
          <Route path="/">
            <Route index element={<h1> Library Management System </h1>} />
            <Route path="user">
              <Route index element={<UserHome />} />
              <Route path="mybook" element={<MyBook />} />
              {/* <Route path="profile" element={<Profile />} /> */}
              {/* <Route path="help" element={<Help />} /> */}
            </Route>
            <Route path="admin">
              <Route index element={<AdminHome />} /> 
              <Route path="settings" element = {<Settings/>} />
              <Route path="etasks" element = {<Etasks/>} />
              {/* <Route path="transaction" element={<Transaction />} /> */}
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Route> 
      </Routes>
  )
}

export default Routers
