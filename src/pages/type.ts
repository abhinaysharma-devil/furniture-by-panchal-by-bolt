export interface Category {
  id: string;
  title: string;
  description: string;
  imgPath: string;
  slug: string;
}

export interface FurnitureItem {
  id: string;
  title: string;
  description: string;
  price: number;
  imgPath: string;
  categoryId: string;
  slug: string;
  inStock: boolean;
  specifications?: Record<string, string>;
}

// You can add other shared types here, e.g., User, Order, CartItem