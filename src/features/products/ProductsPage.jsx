import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import SearchBar from '../../components/SearchBar'
import CategorySidebar from '../../components/CategorySidebar'
import { 
  fetchProductsAsync, 
  fetchCategoriesAsync,
  selectDisplayProducts, 
  selectProductsStatus,
  selectProductsError,
  selectSearchQuery,
  selectSelectedCategory
} from './productsSlice'

const ProductsPage = () => {
  const dispatch = useDispatch()
  
  // Get data from Redux store
  const products = useSelector(selectDisplayProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)
  const searchQuery = useSelector(selectSearchQuery)
  const selectedCategory = useSelector(selectSelectedCategory)

  // Fetch products and categories when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync())
      dispatch(fetchCategoriesAsync())
    }
  }, [status, dispatch])

  // Show loading state
  if (status === 'loading' && products.length === 0) {
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

  // Get page title based on filters
  const getPageTitle = () => {
    if (searchQuery) return `Search Results: "${searchQuery}"`
    if (selectedCategory) {
      return selectedCategory.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    }
    return 'All Products'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Category Sidebar */}
        <CategorySidebar />
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {getPageTitle()}
            </h1>
            
            {/* Search Bar */}
            <SearchBar />
            
            {/* Active Filters */}
            {(searchQuery || selectedCategory) && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <span>Active filters:</span>
                {searchQuery && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedCategory && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Category: {selectedCategory.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {searchQuery 
                  ? `No products found for "${searchQuery}"` 
                  : selectedCategory
                  ? `No products found in this category`
                  : 'No products available.'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Product count */}
              <div className="mt-8 text-gray-600 text-sm text-center">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage