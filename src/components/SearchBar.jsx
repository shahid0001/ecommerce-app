import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchProductsAsync, clearSearch, selectSearchQuery } from '../features/products/productsSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)
  
  // Local state for input value
  const [query, setQuery] = useState(searchQuery)

  // Update local state when Redux search query changes
  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  // Handle search input change
  const handleSearchChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    
    // Dispatch search action after user stops typing
    if (newQuery.trim()) {
      dispatch(searchProductsAsync(newQuery))
    } else {
      // If search is empty, clear search results
      dispatch(clearSearch())
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      dispatch(searchProductsAsync(query))
    }
  }

  // Clear search
  const handleClear = () => {
    setQuery('')
    dispatch(clearSearch())
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        
        {/* Clear Button - only show when there's text */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>
      
      {/* Search hint */}
      <p className="text-sm text-gray-500 mt-2">
        Try searching for: phone, laptop, watch, etc.
      </p>
    </div>
  )
}

export default SearchBar