import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import Home from './Components/Home'
import Cart from './Components/Cart'
import {CartProvider} from './contexts/CartContext'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <CartProvider>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
      </CartProvider>
    </Switch>
  </BrowserRouter>
)

export default App
