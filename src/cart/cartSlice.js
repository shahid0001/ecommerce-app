import { createSlice } from '@reduxjs/toolkit'

// Initial state for cart
const initialState = {
  items: [], // Array to store cart items with quantities
}

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increase quantity if it exists
    addToCart: (state, action) => {
      // action.payload contains the product object
      const product = action.payload
      // Check if product already exists in cart
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // If exists, increase quantity by 1
        existingItem.quantity += 1
      } else {
        // If doesn't exist, add new item with quantity 1
        state.items.push({ ...product, quantity: 1 })
      }
    },
    
    // Remove item from cart completely
    removeFromCart: (state, action) => {
      // action.payload contains the product id
      const productId = action.payload
      // Filter out the item with matching id
      state.items = state.items.filter(item => item.id !== productId)
    },
    
    // Increase quantity of an item in cart
    increaseQty: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      if (item) {
        item.quantity += 1
      }
    },
    
    // Decrease quantity of an item in cart
    decreaseQty: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      if (item) {
        if (item.quantity > 1) {
          // If quantity > 1, decrease by 1
          item.quantity -= 1
        } else {
          // If quantity is 1, remove the item
          state.items = state.items.filter(item => item.id !== productId)
        }
      }
    },
    
    // Clear the entire cart
    clearCart: (state) => {
      state.items = []
    },
  },
})

// Export actions
export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items

// Calculate total price using reduce()
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    // Multiply price by quantity and add to total
    return total + (item.price * item.quantity)
  }, 0)
}

// Calculate total number of items in cart
export const selectCartItemCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0)
}

// Export reducer
export default cartSlice.reducer