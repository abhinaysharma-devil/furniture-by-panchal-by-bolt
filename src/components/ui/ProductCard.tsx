import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { FurnitureItem } from '../../lib/types';
import { formatPrice, truncateText } from '../../lib/utils';
import { useAddItemInCart } from '../../apis/apiHooks';

interface ProductCardProps {
  product: FurnitureItem;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {

  const {
    mutateAsync: addItemsInCart,
  } = useAddItemInCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      addItemsInCart({
        itemId: product.id,
        quantity: 1
      });
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`card group block h-full transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.imgPath}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`absolute bottom-3 right-3 rounded-full p-3 
            ${product.inStock
              ? 'bg-primary text-white hover:bg-primary-600 active:scale-95'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            } 
            transition-all duration-300 transform opacity-0 group-hover:opacity-100 shadow-lg`}
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900 mb-1">{product.title}</h3>
        <p className="text-primary font-semibold mb-2">{formatPrice(product.price)}</p>
        <p className="text-gray-600 text-sm">{truncateText(product.description, 80)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;