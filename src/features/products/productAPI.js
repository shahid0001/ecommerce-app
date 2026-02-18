// API functions to fetch data from DummyJSON
const PRODUCTS_PER_PAGE = 20;

export const fetchProducts = async () => {
  try {
    // Fetch products from DummyJSON API - THIS IS CORRECT ✅
    const response = await fetch('https://dummyjson.com/products?limit=100');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Search products by query - FIXED VERSION ✅
export const searchProducts = async (query) => {
  try {
    // ADDED: &limit=100 to get more search results
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};