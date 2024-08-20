import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id === id)
    filteredList[0].quantity += 1
    console.log(filteredList)
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(each => each.id !== id),
        ...filteredList,
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id === id)
    filteredList[0].quantity -= 1
    console.log(filteredList)
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(each => each.id !== id),
        ...filteredList,
      ],
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const itemInList = cartList.filter(each => each.id === product.id)
    // console.log(itemInList)

    if (itemInList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      itemInList[0].quantity += 1
      this.setState(prevState => {
        console.log(prevState)
        return {
          cartList: [
            ...prevState.cartList.filter(each => each.id !== product.id),
            ...itemInList,
          ],
        }
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
