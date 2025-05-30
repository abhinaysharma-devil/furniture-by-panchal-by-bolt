import mongoose from 'mongoose';

export interface ICategory {
  title: string;
  description: string;
  slug: string;
  imgPath: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
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
  imgPath: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);