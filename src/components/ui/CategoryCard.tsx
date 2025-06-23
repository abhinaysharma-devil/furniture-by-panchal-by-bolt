import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../lib/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, className = '' }) => {
  console.log('category:', category);
  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative block h-80 overflow-hidden rounded-lg ${className}`}
    >
      <div className="absolute inset-0">
        <img
          src={category.imgPath}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-bold mb-2">{category.title}</h3>
        <p className="text-white/80 mb-4 max-w-md">{category.description}</p>
        <div className="flex items-center text-primary hover:text-primary-400 font-medium">
          <span>View Collection</span>
          <ArrowRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;