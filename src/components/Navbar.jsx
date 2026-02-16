import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom' // Import Link from React Router
// import { selectCartItemCount } from '../features/cart/cartSlice'
import { selectCartItemCount } from '../cart/cartSlice'
const Navbar = () => {
  // Get cart item count from Redux store
  const cartItemCount = useSelector(selectCartItemCount)

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Link to products page */}
          <Link to="/products" className="text-xl font-bold hover:text-blue-200 transition-colors">
            E-Shop
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Products Link */}
            <Link 
              to="/products" 
              className="hover:text-blue-200 transition-colors"
            >
              Products
            </Link>
            
            {/* Cart Link with Icon and Counter */}
            <Link to="/cart" className="relative hover:text-blue-200 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              
              {/* Cart Item Count Badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar