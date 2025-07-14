import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Carousel from '../components/ui/Carousel';
import ProductCard from '../components/ui/ProductCard';
import CategoryCard from '../components/ui/CategoryCard';
import { heroSlides, categories, featuredProducts } from '../data/mockData';
import axios from 'axios';
import { useAddSubsEmail } from '../apis/apiHooks';
import { enqueueSnackbar } from 'notistack';

const Home: React.FC = () => {
  const [data, setData] = useState(categories);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

    setCategoriesLoading(true);
    if (baseApiUrl) {
      axios.get(`${baseApiUrl}/api/categories`)
        .then(response => {
          setData(response.data);
          // console.log('Fetched categories from API:$$$', response.data);
        })
        .catch(error => {
          console.error('Error fetching categories from API:', error);
        })
        .finally(() => {
          // console.log('Categories fetch attempt completed.');
          setCategoriesLoading(false);
        });
    } else {
      console.warn('VITE_API_BASE_URL is not set. Using mock data for categories.');
      setCategoriesLoading(false);
    }
  }, []);

  const [featuredProductsData, setFeaturedProductsData] = useState(featuredProducts);
  const [featuredProductsLoading, setFeaturedProductsLoading] = useState(true);

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

    // If you want to show a loader for featured products, initialize its loading state
    setFeaturedProductsLoading(true);

    if (baseApiUrl) {
      axios.get(`${baseApiUrl}/api/furniture-items/featured`)
        .then(response => {
          setFeaturedProductsData(response.data);
          // console.log('Fetched featured products from API:$$$', response.data);
        })
        .catch(error => {
          console.error('Error fetching featured products from API:', error);
        })
        .finally(() => {
          console.log('Featured products fetch attempt completed.');
          setFeaturedProductsLoading(false);
        });
    } else {
      console.warn('VITE_API_BASE_URL is not set. Using mock data for featured products.');
      setFeaturedProductsLoading(false);
    }
  }, []);

  const [email, setEmail] = useState('');

  const {
    mutateAsync: addSubsEmail,
    // isLoading: isAddingEmail,
    // isError: isAddEmailError,
    isSuccess: isAddEmailSuccess
  } = useAddSubsEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addSubsEmail({
        email
      });
    }
    if (isAddEmailSuccess) {
      setEmail(''); // Clear the email input after successful submission
      enqueueSnackbar("Email added Successfully", { variant: "success" });
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="h-[600px]">
        <Carousel
          slides={heroSlides}
          className="h-full"
          interval={5000}
        />
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
              <p className="text-gray-600">Browse our collection of premium furniture categories</p>
            </div>
            <Link to="/categories" className="link flex items-center mt-4 md:mt-0">
              <span>View All Categories</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {categoriesLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading categories...</p>
              {/* You could add a spinner or skeleton loader here */}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data.length > 0 ? data : categories).slice(0, 3).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background-dark">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Discover our most popular furniture pieces</p>
            </div>
            <Link to="/products" className="link flex items-center mt-4 md:mt-0">
              <span>Explore All Products</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {featuredProductsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading featured products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(featuredProductsData.length > 0 ? featuredProductsData : featuredProducts).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Craftsmanship That Lasts</h2>
              <p className="mb-6 text-white/80 leading-relaxed">
                At Furniture By Panchal, we pride ourselves on creating pieces that stand the test of time.
                Our furniture is crafted with attention to detail, using only the finest materials, and designed to be both beautiful and functional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn bg-white text-primary-900 hover:bg-gray-100">
                  Learn About Us
                </Link>
                <Link to="/categories" className="btn border border-white text-white hover:bg-white/10">
                  Browse Collections
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Furniture craftsman at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-2 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12">Read testimonials from our satisfied customers</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest product updates, exclusive offers, and interior design tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="input flex-grow"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </section>
    </div>
  );
};

// Sample testimonials data
const testimonials = [
  {
    name: "Priya Sharma",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    text: "I've purchased multiple pieces from Furniture By Panchal, and each one has exceeded my expectations. The quality is outstanding, and the designs are timeless."
  },
  {
    name: "Raj Malhotra",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    text: "The living room set I bought last year still looks brand new. The customer service was exceptional, from ordering to delivery. Highly recommended!"
  },
  {
    name: "Meera Patel",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    text: "Beautiful designs and excellent craftsmanship. My dining table has become the centerpiece of family gatherings. Worth every penny!"
  }
];

export default Home;