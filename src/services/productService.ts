import { Product, initialProducts } from '@/data/products';

const STORAGE_KEY = 'vibe_threads_products_v1';

export const productService = {
  getProducts: (): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from storage:', e);
    }
    // Seed storage with initial high-fashion catalog
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  },

  getProductById: (id: number): Product | undefined => {
    const all = productService.getProducts();
    return all.find(p => p.id === id);
  },

  createProduct: (productData: Omit<Product, 'id'>): Product => {
    const all = productService.getProducts();
    const newId = all.length > 0 ? Math.max(...all.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      ...productData,
      id: newId,
      images: productData.images && productData.images.length > 0 ? productData.images : [productData.image],
      reviews: productData.reviews || [],
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 0,
      sizes: productData.sizes && productData.sizes.length > 0 ? productData.sizes : ['S', 'M', 'L', 'XL'],
      colors: productData.colors && productData.colors.length > 0 ? productData.colors : [{ name: 'Default', hex: '#000000' }],
      details: productData.details || ['Premium quality tailored construction'],
      care: productData.care || ['Dry clean or delicate cycle']
    };

    const updated = [newProduct, ...all];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('products_updated', { detail: updated }));
    return newProduct;
  },

  updateProduct: (id: number, updates: Partial<Product>): Product => {
    const all = productService.getProducts();
    const index = all.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct = {
      ...all[index],
      ...updates
    };

    all[index] = updatedProduct;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('products_updated', { detail: all }));
    return updatedProduct;
  },

  deleteProduct: (id: number): void => {
    const all = productService.getProducts();
    const filtered = all.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('products_updated', { detail: filtered }));
  },

  resetToDefault: (): Product[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    window.dispatchEvent(new CustomEvent('products_updated', { detail: initialProducts }));
    return initialProducts;
  }
};
