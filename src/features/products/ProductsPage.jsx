import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import SearchBar from '../../components/SearchBar'
import { 
  fetchProductsAsync, 
  selectFilteredProducts, 
  selectProductsStatus,
  selectProductsError 
} from './productsSlice'

const ProductsPage = () => {
  const dispatch = useDispatch()
  
  // Get data from Redux store using selectors
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  // Fetch products when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync())
    }
  }, [status, dispatch])

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show error state
  if (status === 'failed') {
    return (
      <div className="text-center text-red-600 p-8">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Our Products
      </h1>
      
      {/* Search Bar Component */}
      <SearchBar />
      
      {/* Products Grid - Using .map() to render products */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {/* Show total products count */}
      <div className="mt-8 text-gray-600 text-sm">
        Showing {products.length} products
      </div>
    </div>
  )
}

export default ProductsPage
