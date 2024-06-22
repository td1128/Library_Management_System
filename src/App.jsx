import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import MuiBreadcrumbs from './common_components/breadcrumbs/MuiBreadcrumbs'
import ProfileMenu from './common_components/ProfileMenu'
import Routers from './routes/Routers'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="flex justify-between px-2">
        <MuiBreadcrumbs />
        <ProfileMenu />
      </div>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  )
}

export default App
