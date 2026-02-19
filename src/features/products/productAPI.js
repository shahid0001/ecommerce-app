// API functions to fetch data from DummyJSON
const PRODUCTS_PER_PAGE = 20;

const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
  try {
    // In production, use direct URL with CORS mode
    const response = await fetch(`${API_BASE_URL}/products?limit=100`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array as fallback
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${query}&limit=100`, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};