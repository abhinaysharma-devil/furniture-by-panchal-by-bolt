import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { furnitureItems as mockFurnitureItems } from '../data/mockData';
import { FurnitureItem } from '../lib/types';
import axios from 'axios';

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<FurnitureItem[]>([]);
  const [initialProducts, setInitialProducts] = useState<FurnitureItem[]>([]); // To store original order for 'default' sort
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  // const [showFilters, setShowFilters] = useState(false); // Filter UI can be added later

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
    setIsLoading(true);

    if (baseApiUrl) {
      axios.get(`${baseApiUrl}/api/furniture-items`) // Assuming this endpoint returns all items
        .then(response => {
          setProducts(response.data);
          setInitialProducts(response.data); // Store for default sort
        })
        .catch(error => {
          console.error('Error fetching all products from API:', error);
          setProducts(mockFurnitureItems); // Fallback to mock data
          setInitialProducts(mockFurnitureItems);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.warn('VITE_API_BASE_URL is not set. Using mock data for all products.');
      setProducts(mockFurnitureItems);
      setInitialProducts(mockFurnitureItems);
      setIsLoading(false);
    }
  }, []);

  const handleSort = (sortType: typeof sortBy) => {
    setSortBy(sortType);
    let sortedProducts = [...products];

    switch (sortType) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default: // 'default'
        sortedProducts = [...initialProducts]; // Reset to original fetched/mock order
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Our Products</h1>
          <p className="text-gray-600">
            Explore our complete collection of high-quality furniture, designed to bring style and comfort to your home.
          </p>
        </div>

        {/* Sort Controls - Simplified, can expand with filters later */}
        <div className="flex flex-wrap items-center justify-end gap-4 bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <button
              onClick={() => handleSort('default')}
              className={`text-sm px-3 py-1 rounded ${sortBy === 'default' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              Default
            </button>
            <button
              onClick={() => handleSort('price-asc')}
              className={`flex items-center text-sm px-3 py-1 rounded ${sortBy === 'price-asc' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              <SortAsc className="h-3 w-3 mr-1" />
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort('price-desc')}
              className={`flex items-center text-sm px-3 py-1 rounded ${sortBy === 'price-desc' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              <SortDesc className="h-3 w-3 mr-1" />
              Price: High to Low
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading products...</p>
            {/* You could add a spinner or skeleton loader here */}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No products found at the moment.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;