import React from 'react';
import { Users, ShoppingBag, Package, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      change: '+12.5%',
      changeType: 'increase',
    },
    {
      title: 'Total Products',
      value: '456',
      icon: ShoppingBag,
      change: '+8.2%',
      changeType: 'increase',
    },
    {
      title: 'Total Orders',
      value: '789',
      icon: Package,
      change: '+23.1%',
      changeType: 'increase',
    },
    {
      title: 'Revenue',
      value: '₹12,34,567',
      icon: CreditCard,
      change: '+15.3%',
      changeType: 'increase',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #ORD-{2024000 + index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    John Doe
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹12,499
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    March 15, 2024
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;