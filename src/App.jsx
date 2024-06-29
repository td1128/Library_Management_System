import { Provider } from 'react-redux'
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import './App.css'
import MuiBreadcrumbs from './common_components/breadcrumbs/MuiBreadcrumbs';
import Routers from './routes/Routers';

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

