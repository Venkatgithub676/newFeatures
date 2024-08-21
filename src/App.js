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
    // console.log(filteredList)
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(each => {
          if (each.id !== id) {
            return each
          }
          return {...each, quantity: each.quantity + 1}
        }),
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id)
    if (filteredList[0].quantity === 1) {
      this.removeCartItem(id)
    }
    // console.log(filteredList)
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(each => {
          if (each.id !== id) {
            return each
          }
          return {...each, quantity: each.quantity - 1}
        }),
      ],
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    // console.log(id)
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
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.map(each => {
            if (each.id !== product.id) {
              return each
            }
            return {...each, quantity: each.quantity + product.quantity}
          }),
        ],
      }))
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
