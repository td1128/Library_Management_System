import { Provider } from 'react-redux'
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import MuiBreadcrumbs from './common_components/breadcrumbs/MuiBreadcrumbs';
import Routers from './routes/Routers';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <MuiBreadcrumbs/>
      <BrowserRouter >
        <Routers/>
      </BrowserRouter>
    </Provider>
  )
}

export default App

