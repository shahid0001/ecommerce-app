import React from 'react'
import { useDispatch } from 'react-redux'
// import { addToCart } from './cart/cartSlice'
import { addToCart } from '../../cart/cartSlice'
// ProductCard component receives product data as props
const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  // Handle adding product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          {/* Price */}
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-gray-600 text-sm">
              {product.rating}
            </span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard