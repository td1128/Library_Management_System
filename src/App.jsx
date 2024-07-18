import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes/Routers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter basename="/Library_Management_System">
            <Routers />
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
      <Toaster />
    </>
  )
}

export default App
