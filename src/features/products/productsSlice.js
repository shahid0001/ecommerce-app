import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, searchProducts, fetchCategories } from './productAPI'

// Async thunks
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await fetchProducts()
    return products
  }
)

export const searchProductsAsync = createAsyncThunk(
  'products/searchProducts',
  async (query) => {
    const products = await searchProducts(query)
    return { products, query }
  }
)

// THIS IS THE MISSING EXPORT - make sure this exists!
export const fetchCategoriesAsync = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categories = await fetchCategories()
    return categories
  }
)

const initialState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedCategory: '',
  status: 'idle',
  error: null,
  searchQuery: '',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchQuery = ''
      state.filteredItems = []
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
      // Reset search when category changes
      state.searchQuery = ''
      state.filteredItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products cases
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      
      // Search products cases
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.filteredItems = action.payload.products
        state.searchQuery = action.payload.query
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      
      // Fetch categories cases - THIS WAS MISSING!
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

// Export actions
export const { clearSearch, setSelectedCategory } = productsSlice.actions

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectDisplayProducts = (state) => {
  const { filteredItems, searchQuery, selectedCategory, items } = state.products
  
  // If searching, show search results
  if (searchQuery) return filteredItems
  
  // If category selected, filter by category
  if (selectedCategory) {
    return items.filter(product => product.category === selectedCategory)
  }
  
  // Otherwise show all products
  return items
}
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectSearchQuery = (state) => state.products.searchQuery
export const selectCategories = (state) => state.products.categories
export const selectSelectedCategory = (state) => state.products.selectedCategory

// Export reducer
export default productsSlice.reducer