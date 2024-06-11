import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          </Route>
        </Routes>
      </BrowserRouter>
      <h1> Library Management System </h1>
    </Provider>
  )
}

export default App

