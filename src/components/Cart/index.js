import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const clickRemove = () => {
        removeAllCartItems()
      }
      let totalPrice
      if (showEmptyView) {
        totalPrice = 0
      } else if (cartList.length === 1) {
        totalPrice = cartList[0].quantity * cartList[0].price
      } else {
        const pricesList = cartList.map(each => each.quantity * each.price)
        totalPrice = pricesList.reduce((currentVal, acc) => currentVal + acc)
      }

      /* console.log(cartList) */

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={clickRemove}
                  className="remove-btn"
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <CartSummary totalPrice={totalPrice} cartList={cartList} />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
