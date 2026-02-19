import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../cart/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  // Handle adding product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  // Format category name (convert kebab-case to Title Case)
  const formatCategoryName = (category) => {
    if (!category) return ''
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
          }}
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        {/* Price and Rating Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Price */}
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            {product.discountPercentage && (
              <span className="text-xs text-green-600 ml-2">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-gray-600 text-sm font-medium">
              {product.rating}
            </span>
          </div>
        </div>
        
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {formatCategoryName(product.category)}
          </span>
        </div>
        
        {/* Stock Status */}
        {product.stock && (
          <div className="mb-3 text-xs">
            {product.stock > 0 ? (
              <span className="text-green-600">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600">
                ✗ Out of Stock
              </span>
            )}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`
            w-full py-2 px-4 rounded-md transition-colors duration-300 
            flex items-center justify-center gap-2 font-medium
            ${product.stock === 0 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard