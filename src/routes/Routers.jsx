import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserHome } from "../pages/user";
import { AdminHome, Transaction } from "../pages/admin";
import { Routes } from "react-router-dom";
import IssueBook from "../pages/admin/transactions/routes/IssueBook";
import ReturnBook from "../pages/admin/transactions/routes/ReturnBook";


const Routers = () => {
  return (
    <Routes>
          <Route path="/">
            <Route index element={<h1> Library Management System </h1>} />
            <Route path="user">
              <Route index element={<UserHome />} />
              {/* <Route path="profile" element={<Profile />} /> */}
              {/* <Route path="help" element={<Help />} /> */}
            </Route>
            <Route path="admin">
              <Route index element={<AdminHome />} />
              <Route path="transactions">
                <Route index element={<Transaction />} />
                <Route path="issue" element={<IssueBook/>}/>
                <Route path="return" element={<ReturnBook/>}/>
              </Route>
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Route> 
      </Routes>
  )
}

export default Routers
