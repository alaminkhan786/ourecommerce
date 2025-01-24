// This service will handle product synchronization between admin dashboard and frontend

const PRODUCT_SYNC_KEY = 'ecommerce_products';

export const addProduct = (product) => {
  // Get existing products from localStorage
  const existingProducts = JSON.parse(localStorage.getItem(PRODUCT_SYNC_KEY) || '[]');
  
  // Add new product with a unique ID
  const newProduct = {
    ...product,
    id: Date.now().toString(), // Use timestamp as unique ID
    createdAt: new Date().toISOString()
  };

  // Add to existing products
  const updatedProducts = [...existingProducts, newProduct];

  // Save to localStorage for frontend to consume
  localStorage.setItem(PRODUCT_SYNC_KEY, JSON.stringify(updatedProducts));

  return newProduct;
};

export const deleteProduct = (productId) => {
  const existingProducts = JSON.parse(localStorage.getItem(PRODUCT_SYNC_KEY) || '[]');
  
  const updatedProducts = existingProducts.filter(product => product.id !== productId);

  localStorage.setItem(PRODUCT_SYNC_KEY, JSON.stringify(updatedProducts));
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem(PRODUCT_SYNC_KEY) || '[]');
};
