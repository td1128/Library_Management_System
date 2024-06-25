import { Provider } from 'react-redux'
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Help, Profile, UserHome } from './pages/user';
import { AdminHome, Transaction,Settings } from './pages/admin';

// import './App.css'
import MuiBreadcrumbs from './common_components/breadcrumbs/MuiBreadcrumbs';
import Routers from './routes/Routers';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <MuiBreadcrumbs />
        <Routers/>
      </BrowserRouter>
    </Provider>
  )
}

export default App

