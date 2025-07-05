export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  description?: string;
}

export const products: Product[] = [
  // Men's Collection
  {
    id: 1,
    name: "Classic Wool Coat",
    price: 24999,
    originalPrice: 32999,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
    category: "Men",
    isOnSale: true,
    description: "Premium wool coat for winter elegance"
  },
  {
    id: 2,
    name: "Tailored Blazer",
    price: 16599,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    category: "Men",
    isNewArrival: true,
    description: "Sharp tailored blazer for business occasions"
  },
  {
    id: 3,
    name: "Premium Cotton Shirt",
    price: 6599,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    category: "Men",
    description: "Comfortable cotton shirt for everyday wear"
  },
  {
    id: 4,
    name: "Formal Trousers",
    price: 8999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    category: "Men",
    isNewArrival: true,
    description: "Perfectly fitted formal trousers"
  },
  {
    id: 5,
    name: "Casual Polo Shirt",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    category: "Men",
    isOnSale: true,
    description: "Comfortable polo shirt for casual outings"
  },

  // Women's Collection
  {
    id: 6,
    name: "Silk Evening Dress",
    price: 20799,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
    category: "Women",
    isNewArrival: true,
    description: "Elegant silk dress for special occasions"
  },
  {
    id: 7,
    name: "Elegant Midi Skirt",
    price: 10799,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
    category: "Women",
    description: "Versatile midi skirt for office or casual wear"
  },
  {
    id: 8,
    name: "Designer Blouse",
    price: 7999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Women",
    isOnSale: true,
    description: "Stylish blouse with intricate design details"
  },
  {
    id: 9,
    name: "Floral Summer Dress",
    price: 12999,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    category: "Women",
    isNewArrival: true,
    description: "Light and breezy dress perfect for summer"
  },
  {
    id: 10,
    name: "Professional Blazer",
    price: 18999,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop",
    category: "Women",
    description: "Sharp blazer for professional settings"
  },

  // Children's Collection
  {
    id: 11,
    name: "Casual Denim Jacket",
    price: 7499,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a5?w=400&h=500&fit=crop",
    category: "Children",
    description: "Durable denim jacket for active kids"
  },
  {
    id: 12,
    name: "Colorful T-Shirt Set",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop",
    category: "Children",
    isOnSale: true,
    description: "Pack of 3 colorful t-shirts for kids"
  },
  {
    id: 13,
    name: "School Uniform Shirt",
    price: 2999,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=500&fit=crop",
    category: "Children",
    description: "Comfortable school uniform shirt"
  },
  {
    id: 14,
    name: "Party Dress",
    price: 24897, // Converted from $299.99
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop",
    category: "Children",
    isNewArrival: true,
    description: "Beautiful dress for special occasions"
  },
  {
    id: 15,
    name: "Sports Tracksuit",
    price: 6999,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=500&fit=crop",
    category: "Children",
    description: "Comfortable tracksuit for sports activities"
  }
];

export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category);

export const getNewArrivals = () => 
  products.filter(product => product.isNewArrival);

export const getSaleItems = () => 
  products.filter(product => product.isOnSale);

export const searchProducts = (query: string) => 
  products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
