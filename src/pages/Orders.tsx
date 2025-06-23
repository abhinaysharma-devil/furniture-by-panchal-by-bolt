import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { ShoppingBag, Eye, Package } from 'lucide-react';
import { getAllOrdersHook, cancelOrderHook } from '../apis/apiHooks.js';

const Orders: React.FC = () => {

  const [orders, setOrders] = useState([])

  const {
    data: getAllOrders,
    isLoading: isOrdersLoading,
    error: orderError } = getAllOrdersHook()

    let payload

  const {
    data: getAllOrd,
    isLoading: isOrdersLoadi,
    error: orderErro } = cancelOrderHook(payload)

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (confirmed) {
      cancelOrderHook({
        orderId,
        status: "cancelled"
      })
    }
  };

  useEffect(() => {
    setOrders(getAllOrders)
  }, [getAllOrders])

  if (isOrdersLoading) return <p>Loading...</p>;
  if (orderError) return <p>Error: {orderError.message}</p>;

  if (orders?.length === 0) {
    return (
      <div className="py-16">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
            <Link to="/categories" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Order History</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {orders?.map((order: any) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Package className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Items in this order</span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {JSON.parse(order.orderDetails).items?.map((item: any, index: any) => (
                      <div key={index} className="py-2 flex justify-between">
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center">
                  <p className="font-semibold">
                    Total: <span className="text-primary">{formatPrice(JSON.parse(order.orderDetails).total)}</span>
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="btn btn-outline py-2 px-4 text-sm flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Link>

                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="btn py-2 px-4 text-sm bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;