import mongoose from 'mongoose';

export interface IProduct {
  categoryId: mongoose.Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imgPath: string;
  slug: string;
  featured?: boolean;
  inStock: boolean;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  imgPath: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  specifications: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

export const Product = mongoose.model<IProduct>('Product', productSchema);