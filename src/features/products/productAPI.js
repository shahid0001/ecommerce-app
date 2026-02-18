// API functions to fetch data from DummyJSON
const PRODUCTS_PER_PAGE = 20;

export const fetchProducts = async () => {
  console.log('1. Starting to fetch products...'); // Add this
  
  try {
    console.log('2. Making fetch request...'); // Add this
    const response = await fetch('https://dummyjson.com/products?limit=100');
    
    console.log('3. Response status:', response.status); // Add this
    console.log('4. Response ok?', response.ok); // Add this
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    console.log('5. Parsing JSON...'); // Add this
    const data = await response.json();
    
    console.log('6. Products fetched:', data.products?.length); // Add this
    return data.products;
    
  } catch (error) {
    console.error('7. ERROR in fetchProducts:', error.message); // Add this
    console.error('8. Full error:', error); // Add this
    throw error;
  }
};

export const searchProducts = async (query) => {
  console.log('Searching for:', query); // Add this
  
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=100`);
    
    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Search results:', data.products?.length); // Add this
    return data.products;
    
  } catch (error) {
    console.error('Search error:', error.message);
    throw error;
  }
};