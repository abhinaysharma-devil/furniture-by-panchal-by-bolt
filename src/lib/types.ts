export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  slug: string;
  imgPath: string;
}

export interface FurnitureItem {
  id: string;
  categoryId: string;
  title: string;
  price: number;
  description: string;
  imgPath: string;
  slug: string;
  featured?: boolean;
  inStock: boolean;
  specifications?: Record<string, string>;
}

export interface CartItem {
  id: string;
  itemId: string;
  quantity: number;
  item: FurnitureItem;
}

export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    itemId: string;
    title: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}