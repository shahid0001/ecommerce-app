import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../cart/cartSlice'

// Configure the Redux store with all our reducers
export const store = configureStore({
  reducer: {
    products: productsReducer, // Handles all product-related state
    cart: cartReducer, // Handles all cart-related state
  },
})