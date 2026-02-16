import React from 'react'
import { useDispatch } from 'react-redux'
import { increaseQty, decreaseQty, removeFromCart } from './cartSlice'

// CartItemCard component receives cart item data as props
const CartItemCard = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm">
            ${item.price} each
          </p>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(decreaseQty(item.id))}
            className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
          >
            -
          </button>
          
          <span className="w-8 text-center font-semibold">
            {item.quantity}
          </span>
          
          <button
            onClick={() => dispatch(increaseQty(item.id))}
            className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
          >
            +
          </button>
        </div>
        
        {/* Price and Remove */}
        <div className="text-right min-w-[100px]">
          <div className="font-bold text-blue-600">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-600 text-sm hover:text-red-800 mt-1"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard