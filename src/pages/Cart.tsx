import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import QuantityInput from '../components/ui/QuantityInput';
import { useCartClear, useGetCartDetail, useUpdateCartItemQuantity } from '../apis/apiHooks';
import { clearCartItemById } from '../apis/apiController';
import { Skeleton } from "antd";
import { useCart } from '../context/cartContext';

const Cart: React.FC = () => {

  const [getCartItems, setCartItems] = useState([]);
  const { setCart, cart } = useCart();

  const getCartTotal = () => {
    return getCartItems.reduce(
      (total, item) => total + item.quantity * item.item.price, 0
    );
  }

  const {
    data: cartItems,
    isLoading: isCartItemsLoading,
    error: CartItemsError,
    refetch: refetchCartItems
  } = useGetCartDetail();

  const { mutateAsync: updateCartItemQuantity } = useUpdateCartItemQuantity();

  const { mutateAsync: clearCartItems } = useCartClear();

  useEffect(() => {
    if (cartItems) {
      setCartItems(cartItems);
    }
  }, [cartItems]);

  const updateQuantity = async (id: string, quantity: number) => {
    // Optimistically update UI
    setCartItems((prevItems: any[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    // Call the mutation to update the quantity in the backend
    try {
      await updateCartItemQuantity({ id, quantity });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const clearCart = async () => {
    // Optimistically clear the cart
    setCartItems([]);
    setCart(null)
    // Call the mutation to clear the cart in the backend
    try {
      await clearCartItems();
      refetchCartItems()
    } catch (err) {
      console.error("Failed to clear cart:", err);
      // If there's an error, you might want to revert the UI change
      setCartItems(cartItems);
    }
  };

  const removeItem = async (id: string) => {
    setCartItems((prevItems: any[]) => prevItems.filter(item => item.id !== id));
    setCart(Number(Number(cart) - (getCartItems.find(item => item.id === id)?.quantity)))
    try {
      await clearCartItemById(id);
      refetchCartItems()
    } catch (err) {
      console.error("Failed to clear cart:", err);
      setCartItems(cartItems);
    }
  };

  if (isCartItemsLoading) return <Skeleton active />;

  if (CartItemsError) return <p>Error: {CartItemsError.message}</p>;

  if (getCartItems.length === 0) {
    return (
      <div className="py-16">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/categories" className="btn btn-primary">
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Cart Items ({getCartItems.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {getCartItems.map((cartItem: any) => (
                  <div key={cartItem.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="sm:w-20 sm:h-20 w-full h-40 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img
                        src={cartItem.item.imgPath}
                        alt={cartItem.item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-grow">
                      <Link
                        to={`/product/${cartItem.item.slug}`}
                        className="text-lg font-medium text-gray-900 hover:text-primary"
                      >
                        {cartItem.item.title}
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        Unit Price: {formatPrice(cartItem.item.price)}
                      </p>

                      <div className="flex flex-wrap items-center justify-between mt-2">
                        <QuantityInput
                          quantity={cartItem.quantity}
                          onChange={(value) => updateQuantity(cartItem.id, value)}
                        />

                        <div className="mt-4 sm:mt-0 flex items-center">
                          <span className="font-semibold mr-4">
                            {formatPrice(cartItem.item.price * cartItem.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(cartItem.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Remove ${cartItem.item.title} from cart`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {getCartTotal() > 25000 ? 'Free' : formatPrice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (GST 18%)</span>
                    <span className="font-medium">{formatPrice(getCartTotal() * 0.18)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatPrice(
                          getCartTotal() +
                          (getCartTotal() > 25000 ? 0 : 1) +
                          (getCartTotal() * 0.18)
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="btn btn-primary w-full flex items-center justify-center py-3"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/categories"
                    className="mt-4 w-full block text-center text-primary hover:text-primary-600"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Free shipping on orders over ₹25,000</p>
                  <p className="mt-2">Have a coupon? You'll be able to apply it at checkout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;