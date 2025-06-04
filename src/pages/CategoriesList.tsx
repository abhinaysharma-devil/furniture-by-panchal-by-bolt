import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/ui/CategoryCard';
import { categories } from '../data/mockData';
import axios from 'axios';

const CategoriesList: React.FC = () => {

  const [data, setData] = useState(categories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

    setIsLoading(true); // Set loading to true at the start of the effect
    if (baseApiUrl) {
      axios.get(`${baseApiUrl}/api/categories`)
        .then(response => {
          setData(response.data);
          console.log('Fetched categories from API:$$$', response.data);
        })
        .catch(error => {
          console.error('Error fetching categories from API:', error);
          // Falls back to mock data if API call fails, as `data` is initialized with `categories`.
        })
        .finally(() => {
          console.log('Categories fetch attempt completed.');
          setIsLoading(false);
        });
    } else {
      console.warn('VITE_API_BASE_URL is not set. Using mock data for categories.');
      // Continues to use mock data as `data` is initialized with `categories`.
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Furniture Categories</h1>
          <p className="text-gray-600">
            Browse our extensive collection of premium furniture categories.
            Each category features carefully curated pieces designed for both style and comfort.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading categories...</p>
            {/* You could add a spinner or skeleton loader here */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(data.length > 0 ? data : categories).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoriesList;