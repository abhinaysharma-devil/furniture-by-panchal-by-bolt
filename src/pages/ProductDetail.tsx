import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Truck, ShieldCheck, RefreshCcw, Heart } from 'lucide-react';
import QuantityInput from '../components/ui/QuantityInput';
import ProductCard from '../components/ui/ProductCard';
import { formatPrice } from '../lib/utils';
import { useAddItemInCart, useGetItemBySlug, useGetProductCategory, useGetProducts } from '../apis/apiHooks';
import { Skeleton } from "antd";

const ProductDetail: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');

  const {
    data: getItemBySlug,
    isLoading: isItemBySlugLoading,
    error: ItemBySlugError,
    // refetch: refetchProductCategory
  } = useGetItemBySlug(slug);

  const {
    data: getProductsByCategory,
    // isLoading: isProductsByCategoryLoading,
    // error: productError,
    // refetch: refetchProductCategory
  } = useGetProducts("living-room");

  useEffect(() => {
    setProduct(getItemBySlug);

    // Reset quantity when product changes
    setQuantity(1);
    // Reset active tab
    setActiveTab('description');
  }, [getItemBySlug]);

  const {
    data: getProductCategory,
    // isLoading: isProductCategoryLoading,
    // error: categoryError
    // refetch: refetchCategory
  } = useGetProductCategory()

  const {
    mutateAsync: addItemsInCart,
  } = useAddItemInCart();

  const handleAddToCart = async () => {
    if (product) {
      addItemsInCart({
        itemId: product.id,
        quantity: quantity
      });
    }
  };



  if (!product) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/categories" className="btn btn-primary">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getProductCategory?.find(cat => cat.id === product.categoryId);


  if (isItemBySlugLoading) return <Skeleton active />;
  if (ItemBySlugError) return <p>Error: {ItemBySlugError.message}</p>;

  const relatedItems = getProductsByCategory?.filter(i => i.slug != slug)

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/categories" className="text-gray-500 hover:text-primary">Categories</Link>
            {category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link to={`/category/${category.slug}`} className="text-gray-500 hover:text-primary">
                  {category.title}
                </Link>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{product.title}</span>
          </div>

          <Link to={category ? `/category/${category.slug}` : '/categories'} className="link flex items-center mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to {category ? category.title : 'Categories'}</span>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <img
              src={product.imgPath}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-2xl font-semibold text-primary mb-6">{formatPrice(product.price)}</p>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.inStock ? (
              <div className="flex items-center text-green-600 mb-6">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <span>In Stock</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 mb-6">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                <span>Out of Stock</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <QuantityInput
                quantity={quantity}
                onChange={setQuantity}
                max={10}
                className="w-32"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn btn-primary py-3 px-8"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="btn btn-outline py-3 px-6 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over ₹25,000</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">5 Year Warranty</h4>
                  <p className="text-sm text-gray-500">Quality guaranteed</p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCcw className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-500">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 text-sm font-medium border-b-2 ${activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Specifications
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Our furniture is crafted with attention to detail and quality materials, ensuring longevity and durability.
                  Each piece is carefully designed to combine functionality with aesthetic appeal,
                  making it a perfect addition to your home or office space.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We pride ourselves on sustainable manufacturing practices and ethical sourcing of materials.
                  Our commitment to quality ensures that you receive a product that not only looks good but is built to last.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <table className="w-full border-collapse">
                  <tbody>
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="py-3 font-medium text-gray-900 w-1/3">{key}</td>
                        <td className="py-3 text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedItems?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;