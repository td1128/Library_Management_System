import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes/Routers'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Books from './pages/user/Books_catalog/Books'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/Library_Management_System">
          <Routers />
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
      <Toaster/>
   </>
  )
}

export default App
