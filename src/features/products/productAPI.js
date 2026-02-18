// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    if (!response.ok) throw new Error('Failed to fetch products')
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to search products')
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Fetch all categories - THIS MUST EXIST!
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories')
    if (!response.ok) throw new Error('Failed to fetch categories')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Optional: Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`)
    if (!response.ok) throw new Error('Failed to fetch category products')
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}