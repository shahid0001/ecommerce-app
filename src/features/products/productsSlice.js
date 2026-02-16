import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, searchProducts } from './productAPI'

// Initial state for products
const initialState = {
  items: [], // Array to store all products
  filteredItems: [], // Array to store filtered/search results
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchQuery: '', // Current search query
}

// Async thunk for fetching products
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // This function is called automatically by createAsyncThunk
    // It returns a promise, and Redux Toolkit handles the lifecycle
    const products = await fetchProducts()
    return products // This becomes the payload of the fulfilled action
  }
)

// Async thunk for searching products
export const searchProductsAsync = createAsyncThunk(
  'products/searchProducts',
  async (query) => {
    const products = await searchProducts(query)
    return { products, query }
  }
)

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Regular reducers for synchronous actions
    clearSearch: (state) => {
      state.searchQuery = ''
      state.filteredItems = []
    },
  },
  // Extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      // Handle fetchProductsAsync states
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload // Store all products
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // Handle searchProductsAsync states
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.filteredItems = action.payload.products
        state.searchQuery = action.payload.query
      })
  },
})

// Export actions
export const { clearSearch } = productsSlice.actions

// Selectors - functions to get specific data from state
export const selectAllProducts = (state) => state.products.items
export const selectFilteredProducts = (state) => 
  state.products.filteredItems.length > 0 ? state.products.filteredItems : state.products.items
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectSearchQuery = (state) => state.products.searchQuery

// Export reducer
export default productsSlice.reducer