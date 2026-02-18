import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesAsync, setSelectedCategory } from '../features/products/productsSlice'

const CategorySidebar = () => {
  const dispatch = useDispatch()
  const { categories, selectedCategory } = useSelector(state => state.products)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
  }, [dispatch])

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category))
    setIsOpen(false)
  }

  // Safely format category name
  const formatCategoryName = (category) => {
    if (!category) return ''
    
    // If it's a string, format it
    if (typeof category === 'string') {
      return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    
    // If it's an object with name property
    if (typeof category === 'object' && category.name) {
      return category.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    
    // If it's already formatted or other type
    return String(category)
  }

  // Safely get category value for comparison
  const getCategoryValue = (category) => {
    if (!category) return ''
    if (typeof category === 'string') return category
    if (typeof category === 'object' && category.slug) return category.slug
    if (typeof category === 'object' && category.name) return category.name
    return String(category)
  }

  // Get icon for category
  const getCategoryIcon = (category) => {
    const categoryStr = typeof category === 'string' ? category : 
                       (category?.slug || category?.name || '')
    
    const icons = {
      smartphones: '📱',
      laptops: '💻',
      fragrances: '🌸',
      skincare: '🧴',
      groceries: '🛒',
      'home-decoration': '🏠',
      furniture: '🪑',
      tops: '👕',
      'womens-dresses': '👗',
      'womens-shoes': '👠',
      'mens-shirts': '👔',
      'mens-shoes': '👞',
      'mens-watches': '⌚',
      'womens-watches': '⌚',
      'womens-bags': '👜',
      'womens-jewellery': '💍',
      sunglasses: '🕶️',
      automotive: '🚗',
      motorcycle: '🏍️',
      lighting: '💡',
    }
    return icons[categoryStr] || '📦'
  }

  // Ensure categories is an array
  const categoryList = Array.isArray(categories) ? categories : []

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
        aria-label="Toggle categories"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        w-64 bg-white shadow-lg lg:shadow-none
        z-40 overflow-y-auto h-full
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-xl font-bold text-gray-800">Categories</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-4 hidden lg:block">Categories</h2>
          
          {/* All Categories Option */}
          <button
            onClick={() => handleCategoryClick('')}
            className={`
              w-full text-left px-4 py-2 mb-2 rounded-lg transition-colors flex items-center
              ${selectedCategory === '' 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-100 text-gray-700'
              }
            `}
          >
            <span className="mr-2">📋</span>
            All Products
          </button>
          
          {/* Categories List */}
          <div className="space-y-1">
            {categoryList.length === 0 ? (
              <p className="text-gray-500 text-sm px-4 py-2">Loading categories...</p>
            ) : (
              categoryList.map((category, index) => {
                const categoryValue = getCategoryValue(category)
                const displayName = formatCategoryName(category)
                const icon = getCategoryIcon(category)
                
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(categoryValue)}
                    className={`
                      w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center
                      ${selectedCategory === categoryValue 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    <span className="mr-2">{icon}</span>
                    <span className="truncate">{displayName}</span>
                  </button>
                )
              })
            )}
          </div>

          {/* Category count */}
          {categoryList.length > 0 && (
            <p className="text-xs text-gray-500 mt-4 px-2">
              {categoryList.length} categories
            </p>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default CategorySidebar