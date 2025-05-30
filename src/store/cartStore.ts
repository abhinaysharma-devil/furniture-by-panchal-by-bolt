import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, FurnitureItem } from '../lib/types';
import { furnitureItems } from '../data/mockData';

interface CartState {
  items: CartItem[];
  addItem: (itemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (itemId: string, quantity: number) => {
        const items = get().items;
        const existingItemIndex = items.findIndex((item) => item.itemId === itemId);
        
        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const item = furnitureItems.find(item => item.id === itemId);
          if (item) {
            const newCartItem: CartItem = {
              id: `cart-${Date.now()}`,
              itemId,
              quantity,
              item,
            };
            set({ items: [...items, newCartItem] });
          }
        }
      },
      
      removeItem: (cartItemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId),
        }));
      },
      
      updateQuantity: (cartItemId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity * item.item.price,
          0
        );
      },
      
      getCartItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'furniture-cart-storage',
    }
  )
);