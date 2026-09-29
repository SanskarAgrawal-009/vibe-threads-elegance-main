export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string; // e.g. #TVT-894102
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'Credit Card' | 'Net Banking' | 'Cash on Delivery';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
}

const ORDERS_KEY = 'vibe_threads_orders_v1';

export const orderService = {
  getOrders: (): Order[] => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load orders:', e);
    }
    return [
      // Seed with a sample demo order
      {
        id: "#ELG-849201",
        date: "2026-09-28",
        items: [
          {
            id: 1,
            name: "Classic Wool Overcoat",
            price: 24999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&fit=crop",
            size: "L",
            color: "Camel"
          },
          {
            id: 3,
            name: "Supima Cotton Oxford Shirt",
            price: 6599,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&fit=crop",
            size: "M",
            color: "Crisp White"
          }
        ],
        subtotal: 38197,
        discount: 3819,
        shipping: 0,
        total: 34378,
        paymentMethod: "UPI",
        status: "Processing",
        shippingAddress: {
          firstName: "Sanskar",
          lastName: "Agrawal",
          email: "sanskar@example.com",
          phone: "+91 98765 43210",
          address: "402 Elegance Towers, MG Road",
          city: "Bengaluru",
          state: "Karnataka",
          zipCode: "560001",
          country: "India"
        },
        estimatedDelivery: "2-3 business days"
      }
    ];
  },

  getOrderById: (id: string): Order | undefined => {
    const orders = orderService.getOrders();
    return orders.find(o => o.id === id);
  },

  createOrder: (orderData: Omit<Order, 'id' | 'date'>): Order => {
    const orders = orderService.getOrders();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: `#ELG-${randomSuffix}`,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newOrder, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('orders_updated', { detail: updated }));
    return newOrder;
  },

  updateOrderStatus: (id: string, status: Order['status']): Order => {
    const orders = orderService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Order ${id} not found`);
    }

    orders[index].status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('orders_updated', { detail: orders }));
    return orders[index];
  }
};
