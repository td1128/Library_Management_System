
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes/Routers'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast';


import Books from './pages/user/Books_catalog/Books'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/Library_Management_System">
          <Routers />
        </BrowserRouter>
      </Provider>
      <Toaster/>
   </>
  )
}

export default App
