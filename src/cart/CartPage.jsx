import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItemCard from './CartItemCard'
import { selectCartItems, selectCartTotal, selectCartItemCount, clearCart } from './cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  
  // Get cart data from Redux store
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartItemCount)

  // Handle clearing the cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <svg 
          className="mx-auto h-24 w-24 text-gray-400 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Start shopping to add items to your cart!
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items - Using .map() to render cart items */}
        <div className="lg:w-2/3">
          {cartItems.map(item => (
            <CartItemCard key={item.id} item={item} />
          ))}
          
          {/* Clear Cart Button */}
          <button
            onClick={handleClearCart}
            className="mt-4 text-red-600 hover:text-red-800 font-semibold"
          >
            Clear Cart
          </button>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            
            {/* Subtotal */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            
            {/* Shipping (free for demo) */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            
            {/* Tax (10% for demo) */}
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-semibold">${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            
            {/* Total - Using reduce() to calculate */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${(cartTotal * 1.1).toFixed(2)}
                </span>
              </div>
              
              {/* Checkout Button */}
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold">
                Proceed to Checkout
              </button>
            </div>
            
            {/* Item count */}
            <p className="text-sm text-gray-500 mt-4 text-center">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage