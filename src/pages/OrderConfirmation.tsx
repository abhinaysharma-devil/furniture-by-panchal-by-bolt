import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Box, Truck, Calendar, ArrowRight } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useGetOrderById } from '../apis/apiHooks';
import { Skeleton } from "antd";

const OrderConfirmation: React.FC = () => {

  const { orderId } = useParams<{ orderId: string }>();

  const { data: orderByIdData, isLoading, error } = useGetOrderById(orderId || '');

  if (isLoading) return <Skeleton active />;
  if (error) return <p>Error: {error.message}</p>;

  if (!orderByIdData) {
    return (
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="mb-6">The order you're looking for doesn't exist.</p>
            <Link to="/orders" className="btn btn-primary">
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderDate = new Date(orderByIdData.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const deliveryDate = new Date(new Date(orderByIdData.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="py-16">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-8 text-center bg-green-50 border-b border-gray-200">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="mt-4 text-lg font-medium">
              Order ID: <span className="text-gray-900">{orderByIdData.id}</span>
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">Order Date</h3>
                <p className="text-gray-600">{orderDate}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Box className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">Order Status</h3>
                <p className="text-gray-600 capitalize">{orderByIdData.status}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">Estimated Delivery</h3>
                <p className="text-gray-600">{deliveryDate}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>

              <div className="divide-y divide-gray-200">
                {JSON.parse(orderByIdData.orderDetails).items.map((item: any, index: number) => (
                  <div key={index} className="py-4 flex items-center">
                    <div className="flex-grow">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(JSON.parse(orderByIdData.orderDetails).total)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>{JSON.parse(orderByIdData.orderDetails).total > 25000 ? 'Free' : formatPrice(500)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span>{formatPrice(JSON.parse(orderByIdData.orderDetails).total * 0.18)}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(
                      JSON.parse(orderByIdData.orderDetails).total +
                      (JSON.parse(orderByIdData.orderDetails).total > 25000 ? 0 : 500) +
                      (JSON.parse(orderByIdData.orderDetails).total * 0.18)
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.name}</p>
                  <p>{JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.address}</p>
                  <p>
                    {JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.city}, {JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.state} - {JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.pincode}
                  </p>
                  <p>Phone: {JSON.parse(orderByIdData.orderDetails)?.shippingAddress?.phone}</p>
                </div>

                <div className="md:text-right">
                  <p className="font-medium">Delivery Method</p>
                  <p>Standard Delivery</p>
                  <p className="text-gray-600">Delivered within 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-gray-600 mb-4 sm:mb-0">
                A confirmation email has been sent to your registered email address.
              </p>
              <div className="flex space-x-4">
                <Link to="/orders" className="btn btn-primary flex items-center">
                  <span>View All Orders</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;