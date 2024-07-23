import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import Routers from './routes/Routers'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Books from './pages/user/Books_catalog/Books'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
      {/* <Settings /> */}
      {/* <Books/> */}
    </Provider>
  )
}

export default App;
