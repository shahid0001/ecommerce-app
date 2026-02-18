export const fetchProducts = async () => {
  try {
    // Use /api/ prefix instead of full URL
    const response = await fetch('/api/products?limit=100');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`/api/products/search?q=${query}&limit=100`);
    if (!response.ok) throw new Error('Failed to search');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};