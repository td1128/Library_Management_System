import { Provider } from 'react-redux'
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Help, Profile, UserHome } from './pages/user';
import { AdminHome, Transaction,Settings } from './pages/admin';

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
              <Route path="transaction" element={<Transaction />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route> 
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

