import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, SortAsc, SortDesc } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { categories, furnitureItems } from '../data/mockData';
import { FurnitureItem } from '../lib/types';

const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<FurnitureItem[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [category, setCategory] = useState(categories.find(cat => cat.slug === slug));
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (slug) {
      const category = categories.find(cat => cat.slug === slug);
      setCategory(category);
      
      if (category) {
        const categoryProducts = furnitureItems.filter(item => item.categoryId === category.id);
        setProducts(categoryProducts);
      }
    }
  }, [slug]);
  
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
      default:
        // Reset to default order
        if (category) {
          sortedProducts = furnitureItems.filter(item => item.categoryId === category.id);
        }
    }
    
    setProducts(sortedProducts);
  };

  if (!category) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="mb-6">The category you're looking for doesn't exist.</p>
            <Link to="/categories" className="btn btn-primary">
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/categories" className="link flex items-center mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Categories</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
          <p className="text-gray-600 mb-6">{category.description}</p>
          
          {/* Filters and Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <button 
                onClick={() => handleSort('default')}
                className={`text-sm px-3 py-1 rounded ${
                  sortBy === 'default' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Default
              </button>
              <button 
                onClick={() => handleSort('price-asc')}
                className={`flex items-center text-sm px-3 py-1 rounded ${
                  sortBy === 'price-asc' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SortAsc className="h-3 w-3 mr-1" />
                Price: Low to High
              </button>
              <button 
                onClick={() => handleSort('price-desc')}
                className={`flex items-center text-sm px-3 py-1 rounded ${
                  sortBy === 'price-desc' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SortDesc className="h-3 w-3 mr-1" />
                Price: High to Low
              </button>
            </div>
          </div>
          
          {/* Expanded Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-3">Filter by:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Out of Stock</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Under ₹15,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">₹15,000 - ₹30,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">₹30,000 - ₹50,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Above ₹50,000</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Featured</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Featured Items</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="btn btn-primary">Apply Filters</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found in this category.</p>
            <Link to="/categories" className="btn btn-primary">
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;