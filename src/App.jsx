import { Provider } from 'react-redux'
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import './App.css'
import MuiBreadcrumbs from './common_components/breadcrumbs/MuiBreadcrumbs';
import Routers from './routes/Routers';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <MuiBreadcrumbs/>
      <BrowserRouter >
        <Routers/>
      </BrowserRouter>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </Provider>
  )
}

export default App

