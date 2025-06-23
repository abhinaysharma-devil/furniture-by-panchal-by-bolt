import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../lib/types';
// import { orders } from '../data/mockData';
import { useCartStore } from './cartStore';
import axios from 'axios';

interface OrderState {
  orders: (userId: string) => Order[];
  createOrder: (shippingAddress: Order['shippingAddress']) => string | null;
  // getOrderById: (orderId: string) => Order | undefined;
  // cancelOrder: (orderId: string) => boolean;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({

      orders: async (userId: string) => {
        try {
          const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

          const response = await axios.get<Order[]>(
            `${baseApiUrl}/api/orders?userId=${userId}`);

          if (response) {
            return response;
          }

          return false;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error fetching orders:', error.message);
          } else {
            console.error('internal server error', error);
          }
          return false;
        }
      },

      createOrder: (shippingAddress) => {
        const cartStore = useCartStore.getState();
        const items = cartStore.items;

        if (items.length === 0) return null;

        const newOrder: Order = {
          id: `order-${Date.now()}`,
          userId: 'user1', // In a real app, this would be the current user's ID
          orderDate: new Date().toISOString(),
          status: 'processing',
          items: items.map(item => ({
            itemId: item.itemId,
            title: item.item.title,
            quantity: item.quantity,
            price: item.item.price,
          })),
          total: cartStore.getCartTotal(),
          shippingAddress,
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        // Clear the cart after order is created
        cartStore.clearCart();

        return newOrder.id;
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      cancelOrder: (orderId) => {
        const order = get().orders.find(order => order.id === orderId);

        if (!order || order.status !== 'processing') {
          return false;
        }

        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status: 'cancelled' } : order
          ),
        }));

        return true;
      },
    }),
    {
      name: 'furniture-orders-storage',
    }
  )
);