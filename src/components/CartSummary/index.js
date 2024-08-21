// Write your code here
import './index.css'

const CartSummary = props => {
  const {cartList, totalPrice} = props

  return (
    <div className="cart-summary-con">
      <h1 className="cart-summary-order-total">
        Order Total:{' '}
        <span className="cart-summary-total-price">Rs {totalPrice}/-</span>
      </h1>
      <p className="cart-summary-items-in-cart">
        {cartList.length} items in cart
      </p>
      <button type="button" className="cart-summary-checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
